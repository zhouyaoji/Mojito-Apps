//
//  RTServiceInterface.h
//  ychromert
//
//  Created by Anand Biligiri on 2/16/12.
//  Copyright (c) 2012 Yahoo! Inc. All rights reserved.
//

#import "RTObject.h"
#import "RTKernel.h"

@class RTCall;
@class RTHandle;
@class RTService;
@class RTIDLValidator;

//
// RTServiceInterfaceHandleSetup
// 
// Implement one of these if you want to perform implement a handle "constructor" (if your handle needs to keep "states")
@protocol RTServiceInterfaceHandleSetup
@optional
// If you want to do things synchronously, implement this.
- (BOOL)setupHandleSynchronously:(RTHandle *)handle withArguments:(NSDictionary *)arguments;

// If you want to do things asynchronously, implement this, and don't forget to call the callbackBlock passed in when you are done.
- (BOOL)setupHandleAsynchronously:(RTHandle *)handle withArguments:(NSDictionary *)arguments andCallbackBlock:(void (^)(BOOL))callbackBlock;
@end


//
// YChrome Service Public Interface
//
// A service's public interfaces are grouped into a RTServiceInterface objects. The interface object is called by a
// RTHandle instace when a method is invoked on the handle. These methods can be used a factories to generate new
// RTHandle objects for other types of objects implemented by the same class.
//
// The RTServiceInterface base class contains housekeeping logic for tracking outstanding RTHandles of the interface
// type as well as common IDL management routines.
//
@interface RTServiceInterface : RTObject <RTServiceInterfaceHandleSetup>
#pragma mark - Properties

//
// Parent Service
//
@property (nonatomic, retain, readonly) RTService *service;

//
// Interface Description
//
@property (nonatomic, copy, readonly) NSDictionary *IDL;

//
// IDL Validator
//
@property (nonatomic, retain, readonly) RTIDLValidator *IDLValidator;
#pragma mark - Initialization

//
// Initialize w/ Interface ID and Service
//
// IDL is populated by querying the parent service.
//
- (id)initWithID:(NSString *)identifier service:(RTService *)service IDLValidator:(RTIDLValidator *)IDLValidator;

#pragma mark - Calls

// Execute this call.
- (void)invokeCall:(RTCall *)call;

#pragma mark - Handles
- (BOOL)registerHandle:(RTHandle *)handle;
- (BOOL)unregisterHandle:(RTHandle *)handle;
- (RTHandle *)getHandleForContextID:(NSString *)contextID handleID:(NSString *)handleID;

#pragma mark - logging
- (void)log:(NSString *)component severity:(RTLogSeverity)severity format:(NSString *)format, ...;



@end
