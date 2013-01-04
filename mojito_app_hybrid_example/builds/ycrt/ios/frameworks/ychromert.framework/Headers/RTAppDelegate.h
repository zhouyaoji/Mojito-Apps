//
//  RTAppDelegate.h
//  ychromert
//
//  Created by Anand Biligiri on 2/16/12.
//  Copyright (c) 2012 Yahoo! Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "RTLog.h"

@class RTWebViewContext;
@class RTWebView;
@class RTKeyValueStoreProvider;

@interface RTAppDelegate : UIResponder <UIApplicationDelegate, RTLogComponent>

@property (nonatomic, strong, readonly) id <RTLog> logger;
@property (nonatomic, strong, readonly) RTKeyValueStoreProvider *keyValueStoreProvider;

//Path to the directory that has the key value configuration for various services
//This has to be a path to a directory in the bundle on first launch.
//This could get updated to a path managed by the package service on updates
@property (nonatomic, strong, readonly) NSString *defaultsKeyValueStorePath;

//This is the directory that will be used for key-value store that have values other than default
//This should be a writable area
@property (nonatomic, strong, readonly) NSString *customKeyValueStorePath;

#pragma mark - Web View Context
- (RTWebViewContext *)createWebViewContextWithWebView:(RTWebView *)webView;
- (void)destroyWebViewContext:(RTWebViewContext *)context;

#pragma mark - Lifecycle

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions;
// You should override this method and be sure to FIRST call super THEN register your services.
// At the end of your method call [self applicationPostLaunchStateTransition];

// Call this at the end of application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions in your subclass.
- (void)applicationPostLaunchStateTransition;

#pragma mark - Service registration
- (BOOL)registerServices:(NSArray *)services;

@end
