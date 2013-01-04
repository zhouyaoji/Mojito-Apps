//
//  RTCall.h
//  ychromert
//
//  Created by Anand Biligiri on 2/16/12.
//  Copyright (c) 2012 Yahoo! Inc. All rights reserved.
//

#import "RTObject.h"

@class RTHandle;
@class RTError;
//
// invoke method/call constants
//
extern NSString* const kRTCallSuccessCallbackKey; // The "success" callback key.
extern NSString* const kRTCallFailureCallbackKey; // The "failure" callback key.
extern NSString* const kRTCallChangeCallbackKey; // The "change" callback key.
extern NSString* const kRTCallChangeFailureCallbackKey; // The "changeFailure" callback key.
extern NSString* const kRTCallSystemErrorCallbackKey; // The system error callback key
//
// Service Method Call Session
//
@interface RTCall : RTObject

// Use inherited ID for my invocation ID.

//
// Context Identifier
//
// Context ID that originated the method call. This is the first hop that a callback needs to make on it's way back. We
// only care about the first hop regardless of how deeply the original caller's context is nested. To the kernel, it
// looks like all the calls are coming from the same root web view.
//
// The kernel also has it's own context identifier for calls made from native code.
//
@property (nonatomic, copy, readonly) NSString *contextID;

//
// The ID of the handle to use for this call.
//
@property (nonatomic, copy, readonly) NSString *handleID;

//
// Target Handle
//
// Target object or service handle.
//
@property (nonatomic, retain) RTHandle *handle;

//
// Method Name
//
@property (nonatomic, copy, readonly) NSString *method;

//
// Method Arguments
//
// Method call arguments.
//
@property (nonatomic, retain, readonly) NSDictionary *arguments;

//
// YChromeRT Options
//
@property (nonatomic, retain, readonly) NSDictionary *options;
//
// Callbacks
//
// Callback names that can be invoked.
//
@property (nonatomic, retain, readonly) NSSet *callbacks;

//
// Callback Block
//
// The block to execute after the call is processed.
//
@property (nonatomic, copy) void (^callbackBlock)(NSString *, NSDictionary *, NSDictionary*);

// Whether allow the callback block to be modified.
@property (nonatomic, assign) BOOL isBlockModifiable;

// Call Canceled
//
// Thanks to the magic of reference counting, it is possible to hold-on to a canceled call. Check this flag to see if
// you have a stale call. Setting it to YES will terminate the call. Attempting to manipulate a canceled call will do
// nothing / return an error.
//
@property (nonatomic, assign) BOOL isCanceled;

// This block is called (if its set) when the call is canceled (completed) to allow you to cleanup anything associated with the call.
// Calls are canceled whenever a callback is sent that is marked cancelOnCallback = true and the call should be cleaned up after that.
// Usually the service interface or service will setup this block if it needs to cleanup.
// If you need to do asynchronous work use the dispatch group that is passed in otherwise just cleanup directly on the same thread.
@property (nonatomic, copy) void (^cancelBlock)(dispatch_group_t);


// Initialize

- (id)initWithID:(NSString *)callID contextID:(NSString *)contextID handleID:(NSString *)handleID
          method:(NSString *)method arguments:(NSDictionary *)arguments callbacks:(NSSet *)callbacks
         options: (NSDictionary *)options callbackBlock:(void(^)(NSString *, NSDictionary *, NSDictionary*))callbackBlock;

#pragma mark - callbacks
//
// Invoke Callback
//
// Invoke registered callback with arguments, optionally closing session. This also validates the callback
// with the IDL
//
// Returns NO if call is canceled. The error is set.
//
- (BOOL)invokeCallback:(NSString *)callback args:(NSDictionary *)args error:(RTError **)error;

// helper method for ending a call with no callback
- (BOOL)endCall;
// helper method for ending a call with an error
- (BOOL)endCallWithError:(RTError *)error;

#pragma mark - handle management
- (void)setHandleStateValue:(id)object forKey:(NSString *)key;
- (id)handleStateValueForKey:(NSString *)key;
@end
