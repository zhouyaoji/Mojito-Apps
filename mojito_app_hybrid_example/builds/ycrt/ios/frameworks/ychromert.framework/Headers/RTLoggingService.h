//
//  RTLoggingService.h
//  ychromert
//
//  Created by Srinivas Raovasudeva on 2/17/12.
//  Copyright (c) 2012 Yahoo! Inc. All rights reserved.
//

#import "RTService.h"

//
// The protocol to use when defining your own Logger. Normally you would just use RTLoggingService unless you
// want to print or do things in a different manner.
//
@protocol RTServiceLogger <NSObject>

@required
- (void)log:(NSString *)component severity:(RTLogSeverity)severity message:(NSString *)message;

- (BOOL)registerComponent:(NSString *)component initialSeverity:(RTLogSeverity)severity;

- (void)setSeverity:(RTLogSeverity)severity forComponent:(NSString *)component;
- (void)setSeverity:(RTLogSeverity)severity forComponent:(NSString *)component withCallback:(void (^)(BOOL))callback;

- (RTLogSeverity)severityForComponent:(NSString *)component;
- (void)severityForComponent:(NSString *)component withCallback:(void (^)(RTLogSeverity))callback;

@end

/**
 This is the main logging service.
 It should be registered with all other services and then it will register itself to the kernel as the log service when its setup.
*/
@interface RTLoggingService : RTService<RTServiceLogger>

/**
  Public initializer 
  @param loggers An array of loggers that implement the RTLogger protocol (passing in nil will initialize the logging service with the default loggers - same as calling init)
  @returns Instance of RTLoggingService
  @see RTLoggingService#DefaultLoggers
 */
- (id)initWithLoggers:(NSArray *)loggers;

@end
