//
//  RTHandle.h
//  ychromert
//
//  Created by Anand Biligiri on 2/16/12.
//  Copyright (c) 2012 Yahoo! Inc. All rights reserved.
//

#import "RTObject.h"

@class RTServiceInterface;
@class RTCall;
@class RTIDLValidator;
//
// YChrome Object Handle
//
// Represents an active instance of a YChrome object handle. This includes YChrome service singletons. The object handle
// is responsible for tracking ongoing method calls and their callbacks.
//
// Clients can register for broadcast events on each object handle instance.
//
// Object handles can produce other object handles via factory methods.
//
@interface RTHandle : RTObject

#pragma mark - Core Definition

//
// Service Interface
//
// Service interface providing the handle's behavior. Calls to the handle are directed to the interface.
//
@property (nonatomic, assign) RTServiceInterface *interface;

//
// ID of the context this handle belongs to
//
@property (nonatomic, copy, readonly) NSString *contextID;

#pragma mark - Invoke Calls

//
// Execute this call object.
//
- (void)invokeCall:(RTCall *)call;

//
// Drain Calls Waiting For Creation to Complete
//
// During async createHandle() processing, additional calls to the handle are queued-up until the handle is properly
// initialized. When the handle is ready, call this to drain the queue.
//
- (void)drainUninvokedCalls;

#pragma mark - Initialization

//
// Initialize w/ ID, Service Interface and Owner Context
//
- (id)initWithID:(NSString *)identifier interface:(RTServiceInterface *)interface contextID:(NSString *)contextID;

#pragma mark - Broadcast Events

//
// Subscribe Event
//
- (void)subscribeEvent:(NSString *)event callback:(void (^)(NSDictionary *))callback success:(void (^)())success;


#pragma mark - Clean up
//
// Destroy the handle, clean up oustanding RTCalls, etc.
- (void)destroyHandleAndReturnCallback:(void(^)(NSString *, NSDictionary *))callback;

#pragma mark - State Management

- (void)setStateValue:(id)o forStateKey:(NSString *)key;

- (id)stateValueForKey:(NSString *)key;

@end