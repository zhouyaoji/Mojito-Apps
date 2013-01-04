//
//  RTURLProtocol.h
//  ychromert
//
//  Created by Rongrong Zhong on 2/17/12.
//  Copyright (c) 2012 Yahoo! Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
@class RTError;
@class RTURLProtocol;
@class RTKernel;

@protocol RTURLProtocol <NSObject>
//
// Reply w/ Status
//
- (void)replyWithStatus:(NSInteger)status;

//
// Reply w/ Status and Headers
//
- (void)replyWithStatus:(NSInteger)status headers:(NSDictionary *)headers;

//
// Reply w/ "404 - Not Found"
//
- (void)replyWithErrorNotFound;

//
// Reply w/ "501 - Not Implemented"
//
- (void)replyWithErrorNotImplemented;

//
// Reply w/ Data
//
- (void)replyWithData:(NSData *)data;

//
// Reply w/ Data and Headers
//
- (void)replyWithData:(NSData *)data headers:(NSDictionary *)headers;
@end

@protocol RTURLProtocolHandler <NSObject>
- (void)startRequest:(NSURLRequest *)req withProtocol:(RTURLProtocol *)protocol;
@end

@protocol RTURLProtocolRegistrar <NSObject>
+ (void)registerURLProtocolForKernel:(RTKernel *)kernel;
+ (void)unregisterURLProtocol;
+ (void)registerHandler:(id<RTURLProtocolHandler>)urlProtocolHandler forToken:(NSString *)token success:(void(^)())successBlock
                  error:(void(^)(RTError *))errorBlock;
@end

@interface RTURLProtocol : NSURLProtocol <RTURLProtocolRegistrar, RTURLProtocol>

@end
