//
//  RTKernel.h
//  ychromert
//
//  Created by Rongrong Zhong on 2/15/12.
//  Copyright (c) 2012 Yahoo! Inc. All rights reserved.
//

#import "RTObject.h"
#import "RTLog.h"

@class RTService;
@class RTHandle;
@class RTCall;
@class RTError;
@class RTNativeContext;
@class RTKeyValueStoreProvider;

@protocol RTURLProtocolHandler;
@protocol RTURLProtocolRegistrar;
@protocol RTServiceLogger;
//
// NOTE: Don't change the order!
//
typedef enum {
    kRTStateUnregistered = 0,   // Kernel has no registered services, Service hasn't been registered.
    kRTStateRegistered,         // Kernel has registered services, Service has been registered.
    kRTStateSetup,              // Kernel has some services in the setup state. Service is doing heavy init.
    kRTStateFocused,            // User has full control of the interface.
    kRTStateUnfocused,          // User has lost control of the interface (or has entered unfocused from setup).
    kRTStateSuspended,          // Application will background. Snapshot will be taken so fix up UI and pause/purge uneeded things.
} RTState;

@interface RTKernel : RTObject

#pragma mark - Services
@property (nonatomic, readonly, retain) NSDictionary *services;

- (id)initWithID:(NSString *)ID urlProtocolClass:(Class<RTURLProtocolRegistrar>)urlProtocolClass keyValueProvider:(RTKeyValueStoreProvider *)provider;

#pragma mark - Life Cycle
@property (nonatomic, assign) RTState currentState;
//
// Set Target Kernel State
//
// Set the state we would "like" the kernel to transition to, knowing that it may take some time to catch-up. If we've
// been asked to suspend, we should use -[beginBackgroundTaskWithExpirationHandler:] to make time for services to catch
// up.
//
// Not sure if we can leave the focused state in such an asynchronous manner because there isn't an API to "not take a
// snapshot right now" like -[beginBackgroundTaskWithExpirationHandler:]. If everybody is already in the resmued state,
// we can synchronously transition to the focused state. If everybody is in the focused state, we can synchronously
// transition to the resumed state. Another other state and we will just update targetState and return -- snapshots be
// damned!
//
@property (nonatomic, assign) RTState targetState;

#pragma mark - Version Management

@property (nonatomic, copy, readonly) NSString *currentAppVersion;
@property (nonatomic, copy, readonly) NSString *previousAppVersion;

@property (nonatomic, readonly) BOOL isFirstLaunch;
@property (nonatomic, readonly) BOOL wasUpdated;
@property (nonatomic, readonly) BOOL hadCrashed;

@property (atomic, assign) RTLogSeverity defaultSeverity;

// Wait for the current state to reach waitForState. If currentState is not waitForState the calling thread will be blocked until it is.
//
- (void)waitForCurrentState:(RTState)waitForState;

@end

@interface RTKernel (Logging)
//
// Log Message (Thread-Safe)
//
- (void)log:(NSString *)component severity:(RTLogSeverity)severity format:(NSString *)format, ...;

//
// Register Component (Thread-Safe)
//
- (BOOL)registerComponent:(NSString *)component initialSeverity:(RTLogSeverity)severity;

//
// Adjust Component Severity (Thread-Safe)
//
- (void)setSeverity:(RTLogSeverity)severity forComponent:(NSString *)component;
- (RTLogSeverity)severityForComponent:(NSString *)component;

//
// Take Over Logging From Kernel
//
// NOTE: We may be given a RTServiceProxy object if it is remote!
//
- (BOOL)registerLogService:(RTService <RTServiceLogger> *)service;

- (BOOL)isLoggingServiceRegistered;

@end

@interface RTKernel (Service)
//
// Batch Register Services
//
// NOTE: Can only be done once (for now....).
//
- (BOOL)registerServices:(NSArray *)services;

//
// Lookup Service by Name
//
- (RTHandle *)lookupServiceName:(NSString *)name;

//
// Lookup Service by ID
//
- (RTHandle *)lookupServiceID:(NSString *)identifier;

//
// create and register a service handle
//
- (void)createHandleForService:(NSString *)serviceID 
                     interface:(NSString *)interface
                       context:(NSString *)contextID
                  withHandleID:(NSString *)handleID
                          args:(NSDictionary *)arguments
                 callbackBlock:(void(^)(NSString *, NSDictionary *))nativeContextCallbackBlock;

//
// Destroy a service handle
//
- (void) destroyHandleWithID: (NSString *)handleID withinContext: (NSString *)contextID callbackBlock:(void(^)(NSString *, NSDictionary *))nativeContextCallbackBlock;

@end



@interface RTKernel (Call)
// Invoke this call on the proper service.
- (void)invokeCall:(RTCall *)call;
- (void)cancelMethod:(NSString *)invokeID inContext:(NSString*) contextID callbackBlock:(void(^)(NSString *, NSDictionary *))nativeContextCallbackBlock;
@end

@interface RTKernel (Protocol)
- (void)registerURLProtocolHandler:(id<RTURLProtocolHandler>)urlProtocolHandler
                          forToken:(NSString *)token
                           success:(void (^)())successBlock
                             error:(void (^)(RTError *))errorBlock;

@end
