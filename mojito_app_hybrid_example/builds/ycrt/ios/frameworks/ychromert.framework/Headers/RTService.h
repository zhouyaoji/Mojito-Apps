//
//  RTService.h
//  ychromert
//
//  Created by Anand Biligiri on 2/16/12.
//  Copyright (c) 2012 Yahoo! Inc. All rights reserved.
//

#import "RTObject.h"
#import "RTKernel.h"

@class RTCall;
@class RTHandle;
@class RTIDLCreator;
@class RTIDLValidator;
@class RTHandleCreator;
@protocol RTServiceInterfaceCreator;

//
// Setup Hints
//
typedef enum {
    kRTServiceSetupFlagNone           = 0x0000, // No service setup flags
    kRTServiceSetupFlagFirstTime     = 0x0001, // App starting for first time
    kRTServiceSetupFlagUpgrade       = 0x0002, // App was upgraded, update persistent data structures
    kRTServiceSetupFlagCrashRecovery = 0x0004  // Recover from an app crash
} RTServiceSetupFlags;

@interface RTService : RTObject
#pragma mark - Service Information

//
// Name
//
@property (nonatomic, copy, readonly) NSString *name;

//
// Extendes Service
//
// For service extensions, the identifer of the service to be extended, otherwise nil.
//
@property (nonatomic, copy, readonly) NSString *extendsService;

//
// Mandatory Service Dependencies
//
// Set of required service identifiers.
//
@property (nonatomic, copy, readonly) NSSet *mandatoryServices;

//
// Optional Service Dependencies
//
// Set of optional service identifiers.
//
@property (nonatomic, copy, readonly) NSSet *optionalServices;

//
// Setup From Main Thread
//
@property (nonatomic, readonly) BOOL onlySetupOnMainThread;

//
// Interface Description
//
// Derived from the interface's IDL, describes the methods and sub-objects.
//
@property (nonatomic, copy, readonly) NSDictionary *interfaceDescription;

//
// The actual interfaces
// key: interface name
// value: pointer to the interface
//
@property (nonatomic, retain, readonly) NSDictionary *interfaces;

//
// Kernel
//
// Reference to a kernel that has the service registered
//
@property (nonatomic, assign, readonly) RTKernel *kernel;


//
// Service Interface Creator
//
// Used to create Service Interface(s)
//
@property (nonatomic, retain, readonly) id<RTServiceInterfaceCreator> serviceInterfaceCreator;


#pragma mark - Lifecycle

//
// Setup Service w/ Group
//
// Transition from registered to setup state.
// Only called once during kernel startup, performs heavy setup.
// Create any background tasks this service needs.
//
// NOTE: Can be called from a worker thread. Be careful what APIs are used!
//
- (void)setup:(RTServiceSetupFlags)flags withGroup:(dispatch_group_t)group;

//
// Transition from setup or suspended to unfocused state.
// Check self.kernel.currentState to determine the state you are transitioning from
// if you need to make a distinction in your code.
//
- (void)enterUnfocused;

//
// Transition from unfocused to suspended.
//
// Stop timers or periodic tasks.
// Don't start new tasks.
// Suspend any dispatch queues or operation queues executing non-critical code.
//
- (void)enterSuspend;

//
// Transition from unfocused to focused.
//
// Restart timers or tasks related to user activity.
// Restart paused movies.
//
- (void)enterFocused;

//
// Transition from focused to unfocused (and will likely background next).
//
// Don't start new tasks.
// Pause movies.
// Stop timers or suspend tasks related to user activity.
//
- (void)leaveFocused;

#pragma mark - Actions

#pragma mark - logging
- (void)log:(NSString *)component severity:(RTLogSeverity)severity format:(NSString *)format, ...;
@end