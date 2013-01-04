//
//  RTError.h
//  ychromert
//
//  Created by Rongrong Zhong on 2/23/12.
//  Copyright (c) 2012 Yahoo! Inc. All rights reserved.
//

#import <Foundation/Foundation.h>

extern NSString *kRTUnderlyingError;

@interface RTError : NSError

//
// Subclasses should over-ride this. An exception will be raised if the base class version is invoked
//
+ (NSString *)domain;

//
// Create w/ Underlying Error, Error Code, and User Info
//
+ (id)errorWithDomain:(NSString *)domain error:(NSError *)error code:(NSInteger)code userInfo:(NSDictionary *)dict;

// Designated Initializer
// Initialize w/ Underlying Error, Error Code, and User Info
//
- (id)initWithDomain:(NSString *)domain error:(NSError *)error code:(NSInteger)code userInfo:(NSDictionary *)dict;

//
// Invokes errorWithDomain:code:userInfo: . The domain is obtained by invoking +[class domain]
//
+ (id)errorWithCode:(NSInteger)code userInfo:(NSDictionary *)dict;

//
// Subclasses should over-ride this method and invoke errorWithDomain:error:code:userInfo:
//
+ (id)errorWithError:(NSError *)error code:(NSInteger)code userInfo:(NSDictionary *)info;

//
// Invokes initWithDomain:code:userInfo: The domain is obtained by invoking +[class domain]
//
- (id)initWithCode:(NSInteger)code userInfo:(NSDictionary *)dict;

//
// Invoked initWithDomain:error:code:userInfo: . The domain is obtained by invoking +[class domain]
//
- (id)initWithError:(NSError *)error code:(NSInteger)code userInfo:(NSDictionary *)into;

- (NSDictionary *)errorResponse;
@end
