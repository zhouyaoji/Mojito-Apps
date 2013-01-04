//
//  RTNativeContext.h
//  ychromert
//
//  Created by Rongrong Zhong on 2/14/12.
//  Copyright (c) 2012 Yahoo! Inc. All rights reserved.
//

#import "RTContext.h"

@class RTWebViewContext;
@class RTKernel;

//
// Native / Root Context
//
// Represents the entire native execution environment. This is also the root of all contexts for the application.
//
@interface RTNativeContext : RTContext

#pragma mark - Properties

//
// Native Kernel
//
@property (nonatomic, retain, readonly) RTKernel *kernel;


#pragma mark -
- (id)initWithID:(NSString *)identifier parent:(RTContext *)parent kernel:(RTKernel *)kernel;

- (void)routeMessage:(NSDictionary *)message;

@end
