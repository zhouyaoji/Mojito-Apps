//
//  RTObject.h
//  YChomeRT
//
//  Created by Rongrong Zhong on 2/14/12.
//  Copyright (c) 2012 Yahoo! Inc. All rights reserved.
//
#import "RTLog.h"

@protocol RTDispatch;
@class RTTimer;

//
// YChomeRT Object Base Class
//
// All YChomeRT objects share some common behaviors such as a unique identifier and a dispatch queue for synchronization.
//
@interface RTObject : NSObject <RTLogComponent>

#pragma mark - Properties

//
// Unique ID (immutable)
//
// The unique ID must be set at initialization and then never changed.
//
@property (nonatomic, copy, readonly) NSString *ID;

//
// Valid Sync Callers
//
// Set of classes that are allowed to trigger syncBlock calls against this class. Helps enforce ordered locking so that
// we cannot deadlock.
//
+ (NSSet *)validSyncCallers;

//
// GCD Dispatch Queue
//
// YChomeRT's asynchronous nature meshes well with Apple's Grand Central Dispatch. Instead of using mutexes / locks,
// YChomeRT uses GCD dispatch queues to serialize data access.
//
// For YChromeRT objects that don't require locking semantics, the dispatch queue is initialized lazily. Once created,
// the queue is destroyed when the object is deallocated.
//
// By default, the queue targets the default priority queue, if a different priority is desired, it should be changed
// during the object's initialization to avoid problems.
//
// The queue property should only be referenced by the RTObject helper methods. If you need to access the queue, then
// you should use the helpers or otherwise, we should add the missing functionality. Blocks invoked against this queue
// must properly update self.activeThread or we will deadlock!
//

//@property (nonatomic, readonly) dispatch_queue_t queue;

#pragma mark - Initialzation

//
// Initialize w/ Unique ID
//
- (id)initWithID:(NSString *)identifier;

#pragma mark - Block Helpers

//
// Synchronously Invoke Block On RTObject (queue this block and only return when its executed).
//
// ALWAYS used internally instead of @synchronized () by getters to read internal state in a thread safe manner:
//  - (BOOL)internalVariable {
//   __block BOOL result;
//   [self syncBlock:^() {
//     result = self->mInternalVariable;
//   }
//   return result;
//  }
//
// Avoid using it from outside of the same class like this:
//  [someObj syncBlock:someBlock];
//
// The block should execute quickly and avoid blocking and accessing other RTObjects. While this is not strictly
// forbidden, it helps reduce the risk of deadlock or causing thread contention.
//
// Note that use of @synchronized or other synchronization like NSRecursiveLock bypasses this mechanism and
// will result in multiple threads being able to access the object simultaneously which is what we are trying to avoid.
//
- (void)syncBlock:(void (^)())block;

//
// Asynchronously Invoke Block On RTObject (queue this block and return, block executes when its turn arrives).
//
// Mainly used internally by public async methods to bounce calls from outside entities into the object's locking domain:
//  - (void)downloadStuff:(void (^)(NSData *))completion {
//   [self asyncBlock:^() {
//     // Do async work
//
//     if (completion) {
//      completion(data);
//     }
//   }
//  }
//
// Avoid using it from outside of the same class like this:
//  [someObj asyncBlock:someBlock];
//
// Use is similar to performSelector:onThread: to access ivars bound to a thread.
//
- (void)asyncBlock:(void (^)())block;

//
// Asynchronously Invoke Block On RTObject w/ Shortcut Optimization
//
// Most of the time asynchronous blocks are meant to be queued and run on the next "run loop". In other situations, they
// are used purely for thread synchronization. With fast = YES, we will try to run the block synchronously if possible.
// This can happen if the object isn't being used by another thread or the current thread is already accessing the same
// object.
//
// When in doubt, don't use the fast optimization, your callbacks may get triggered much sooner than expected and you
// can blow the stack they are being used recursively (eg. reocurring timers).
//
- (void)asyncBlock:(void (^)())block fast:(BOOL)fast;

//
// Asynchronously Invoke Block On RTObject Against Dispatch Group
//
// Dispatch groups allow other threads to wait until a bunch of blocks complete.
//
- (void)asyncBlock:(void (^)())block onGroup:(dispatch_group_t)group;

//
// Asynchronously Invoke Block On RTObject Against Optional Dispatch Group and Shortcut Optimization
//
// This is the fully featured implementation that the previous asyncBlock methods wrap around.
//
- (void)asyncBlock:(void (^)())block onGroup:(dispatch_group_t)group fast:(BOOL)fast;

//
// Async Group Notify
//
// Use in place of dispatch_group_notify(group, self.queue, ^{})
//
- (void)groupNotify:(void (^)())block onGroup:(dispatch_group_t)group;

#pragma mark - Timer Helpers

//
// Returns Blank Timer (Factory)
//
- (RTTimer *)newTimer;

//
// Creates a Timer with timeout
// that fires eventBlock when timer runs out
- (RTTimer *)newTimerWithTimeout:(uint64_t) timeout 
                      eventBlock:(void (^)()) eventBlock;


@end

//
// RTObject Dispatch Protocol
//
@protocol RTDispatch

- (void)dispatch:(dispatch_queue_t)queue sync:(void (^)())block;
- (void)dispatch:(dispatch_queue_t)queue async:(void (^)())block;

- (void)dispatch:(dispatch_queue_t)queue group:(dispatch_group_t)grouop async:(void (^)())block;
- (void)dispatch:(dispatch_queue_t)queue group:(dispatch_group_t)grouop notify:(void (^)())block;

@end
