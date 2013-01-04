//
//  RTLog.h
//  ychromert
//
//  Created by Daryl Low on 3/16/12.
//  Copyright (c) 2012 Yahoo! Inc. All rights reserved.
//
#import <Foundation/Foundation.h>

@protocol RTLog;
@protocol RTLogComponent;

//
// Log Severity Levels
//
typedef enum {
    kRTLogSeverityNone = 0,  // Logging disabled / invalid level
    kRTLogSeverityFatal,     // Only show fatal errors
    kRTLogSeverityError,     // Show errors and fatal
    kRTLogSeverityWarning,   // Show warnings, errors and fatal
    kRTLogSeverityInfo,      // Show info and more serious
    kRTLogSeverityDebug,     // Show debug and above
    kRTLogSeverityTrace,     // Super chatty!
} RTLogSeverity;

//
// Log Interfaces
//
// Represents an object that can "log stuff". Logging clients call this interface to log messages, register components
// and adjust severity.
//
@protocol RTLog <NSObject>

//
// Log Message (variable argument)
//
// Called to log something against a component.
//
// NOTE: For performance reasons, we use NSTimeInterval instead of NSDate and const char * instead of NSString to avoid
//       requiring two alloc / init on every log line. If the internal implementation wants object representation, they
//       can take the performance hit.
//
- (void)log:(id <RTLogComponent>)component
   severity:(RTLogSeverity)severity
       time:(NSTimeInterval)time
       line:(int)line
       file:(const void *)file
    message:(NSString *)message;

//
// Register Component
//
- (BOOL)registerComponent:(id <RTLogComponent>)component
          initialSeverity:(RTLogSeverity)severity;

//
// Unregister Component
//
- (BOOL)unregisterComponent:(id <RTLogComponent>)component;

//
// Get Severity For Component
//
- (RTLogSeverity)severityForComponent:(id <RTLogComponent>)component;

//
// Set Severity For Component
//
- (void)setSeverity:(RTLogSeverity)severity
       forComponent:(id <RTLogComponent>)component;

@end

//
// Log Component Interface
//
// Any entity that wants to be (not have) its own component must implement this interface.
//
// NOTE: When we support JS objects being their own components, we would have to create a placeholder class that
//       conforms to this protocol.
//
// NOTE: The timestamp is using the iOS Epoch of "1 January 2001, GMT" instead of the UNIX epoch because we can get it
//       without doing any special math or allocating a dummy object. If you like most people in the world use the UNIX
//       epoch, don't forget to *add* NSTimeIntervalSince1970 (not *subtract*, trust me ;).
//
@protocol RTLogComponent <NSObject>

//
// Log Component Name
//
// Return the component's name.
//
@property(nonatomic, readonly) NSString *componentName;

//
// Log Component Logger
//
// Every component should have a reference to something that implements the RTLog protocol, otherwise how did it manage
// to register itself?
//
@property(nonatomic, strong, readonly) id <RTLog> logger;

@end

#pragma mark - Helper Macros

#define RTLOG_DEFAULT_DEBUG_SEVERITY   kRTLogSeverityDebug
#define RTLOG_DEFAULT_RELEASE_SEVERITY kRTLogSeverityError

#ifdef DEBUG
#define RTLOG_DEFAULT_SEVERITY RTLOG_DEFAULT_DEBUG_SEVERITY
#else
#define RTLOG_DEFAULT_SEVERITY RTLOG_DEFAULT_RELEASE_SEVERITY
#endif

//
// Register Component
//
#define RTRegisterComponentLoggerSev(__logger__, __sev__) \
    do { \
        [(__logger__) registerComponent:self \
                        initialSeverity:__sev__]; \
    } while(0)

//
// Regsiter self w/ Default Severity Levels
//
#define RTRegisterComponentLogger(__logger__) \
    RTRegisterComponentLoggerSev((__logger__), RTLOG_DEFAULT_SEVERITY)

#define RTRegisterComponent() \
    RTRegisterComponentLogger([self logger])

//
// Regsiter self w/ Specific Severity Levels
//
#ifdef DEBUG
#define RTRegisterComponentSev(__debug_sev__, __release_sev__) \
    RTRegisterComponentLoggerSev([self logger], __debug_sev__)
#else
#define RTRegisterComponentSev(__debug_sev__, __release_sev__) \
    RTRegisterComponentLoggerSev([self logger], __release_sev__)
#endif

//
// Long-Form
//
// Must provide explicit pointers to RTLog and RTLogComponent. No assumptions are made.
//
#define RTLogLogger(__logger__, __comp__, __sev__, __fmt__, ...) \
    do { \
        [(__logger__) log:(__comp__) \
                 severity:(__sev__)  \
                     time:[NSDate timeIntervalSinceReferenceDate]\
                     line:(__LINE__) \
                     file:(__FILE__) \
                  message:[NSString stringWithFormat:(__fmt__), ##__VA_ARGS__]]; \
    } while(0)

//
// Medium-Form
//
// Assumes the given component has a reference to a valid log object.
//
#define RTLogComponent(__comp__, __sev__, __fmt__, ...) \
    RTLogLogger([(__comp__) logger], __comp__, __sev__, __fmt__, ##__VA_ARGS__)

//
// Super-Cool Short-Form
//
// Assumes self implements the RTLogComponent protocol.
//
#define RTLog(__sev__, __fmt__, ...) \
    RTLogComponent(self, __sev__, __fmt__, ##__VA_ARGS__)
