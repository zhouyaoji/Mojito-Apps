//
//  AppDelegate.m
//  template
//
//  Copyright (c) 2012 Yahoo! Inc. All rights reserved.
//

#import "AppDelegate.h"

#import "ViewController.h"

#import <ychromert/YChromeRT.h>
#import <ychromert/RTAccelerometerService.h>
#import <ychromert/RTCameraService.h>
#import <ychromert/RTCompassService.h>
#import <ychromert/RTConnectionMonitorService.h>
#import <ychromert/RTDummyService.h>
#import <ychromert/RTGeoService.h>
#import <ychromert/RTLocationManager.h>
#import <ychromert/RTLoggingService.h>
#import <ychromert/RTNotificationService.h>
#import <ychromert/RTPackageService.h>
#import <ychromert/RTWebViewContext.h>
#import <ychromert/RTLogger.h>
#import <ychromert/RTLog.h>

#import <CoreMotion/CoreMotion.h>

// [Srinivas 03/19/2012] HACK: Remove this once we properly expose setSeverity:forComponent in RTAppDelegate
// The proper fix will be part of Daryl's changes for exposing a generic logger object
@interface RTAppDelegate (Expose)
@property (nonatomic, readonly) RTKernel *kernel;
@end

#define USE_SIMPLE_LOGGER 1
#if USE_SIMPLE_LOGGER
@interface SimpleLogger : NSObject<RTLogger>

- (void)log:(NSString *)component severity:(NSString *)severity timeStamp:(NSDate *)timeStamp message:(NSString *)message;

@end

@implementation SimpleLogger

- (void)log:(NSString *)component severity:(NSString *)severity timeStamp:(NSDate *)timeStamp message:(NSString *)message
{    
    NSLog(@"%@ %@", component, message);
}

@end
#endif


@implementation AppDelegate

@synthesize window = _window;
@synthesize viewController = _viewController;

- (RTWebViewContext *)createWebViewContextWithWebView:(RTWebView *)webView
{   // This is called when a web view context is created. This lets you modify the log level on it.
    RTWebViewContext *webViewContext = [super createWebViewContextWithWebView:webView];
#if DEBUG
    // We want trace for now for messages crossing the bridge.
    [self.kernel.logger setSeverity:kRTLogSeverityTrace forComponent:webViewContext];
#endif
    return webViewContext;
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{   // Setup YChrome App by first calling super.
    [super application:application didFinishLaunchingWithOptions:launchOptions];

    //Create services you want in your app
    CMMotionManager *coreMotionManager = [[CMMotionManager alloc] init];
    RTLocationManager *locationManager = [[RTLocationManager alloc] init];
    RTAccelerometerService *accelService = [[RTAccelerometerService alloc] initWithCoreMotionManager:coreMotionManager];
    RTCameraService *cameraService = [[RTCameraService alloc] initWithViewControllerDelegate:self];
    RTCompassService *compassService = [[RTCompassService alloc] initWithLocationManager:locationManager];
    RTConnectionMonitorService *connectionMonitorService = [[RTConnectionMonitorService alloc]
                                                                initWithURL:[NSURL URLWithString:@"http://www.yahoo.com"]];
    RTDummyService *dummyService = [[RTDummyService alloc] init];
#if USE_SIMPLE_LOGGER
    RTLoggingService *loggingService = [[RTLoggingService alloc] initWithLoggers:[NSArray arrayWithObject:[[SimpleLogger alloc] init]]];
#else
    RTLoggingService *loggingService = [[RTLoggingService alloc] init];
#endif
    RTNotificationService *notificationService = [[RTNotificationService alloc] init];
    RTPackageService *packageService = [[RTPackageService alloc] init];
    RTGeoService *geoService = [[RTGeoService alloc] initWithLocationManager:locationManager];
    
    // Setup application and kernel log levels before we register.
#if DEBUG
    [self.kernel.logger setSeverity:kRTLogSeverityDebug forComponent:self];
    [self.kernel.logger setSeverity:kRTLogSeverityDebug forComponent:self.kernel];
#else
    [self.kernel.logger setSeverity:kRTLogSeverityWarning forComponent:self];
    [self.kernel.logger setSeverity:kRTLogSeverityWarning forComponent:self.kernel];
#endif
    
    
    // Register services
    [self registerServices:[NSArray arrayWithObjects:
                            accelService,
                            cameraService,
                            compassService,
                            connectionMonitorService,
                            dummyService,
                            geoService,
                            loggingService,
                            notificationService,
                            packageService,
                            nil]];
        
    // Setup log levels for the services you registered (they are usually at level kRTLogSeverityError otherwise).
#if DEBUG
    [self.kernel.logger setSeverity:kRTLogSeverityDebug forComponent:accelService];
    [self.kernel.logger setSeverity:kRTLogSeverityDebug forComponent:cameraService];
    [self.kernel.logger setSeverity:kRTLogSeverityDebug forComponent:compassService];
    [self.kernel.logger setSeverity:kRTLogSeverityDebug forComponent:connectionMonitorService];
    [self.kernel.logger setSeverity:kRTLogSeverityDebug forComponent:geoService];
    [self.kernel.logger setSeverity:kRTLogSeverityTrace forComponent:packageService]; // Trace for now to check which scripts loaded.
#endif
    
    // Setup the UI
    self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
    // Override point for customization after application launch.
    if ([[UIDevice currentDevice] userInterfaceIdiom] == UIUserInterfaceIdiomPhone) {
        self.viewController = [[ViewController alloc] initWithNibName:@"ViewController_iPhone" bundle:nil];
    } else {
        self.viewController = [[ViewController alloc] initWithNibName:@"ViewController_iPad" bundle:nil];
    }
    self.window.rootViewController = self.viewController;
    [self.window makeKeyAndVisible];
    
    // Last call this to start first state transition.
    [self applicationPostLaunchStateTransition];
    
    return YES;
}

- (void)applicationWillResignActive:(UIApplication *)application
{   // Call super to change states properly for the kernel and services.
    [super applicationWillResignActive:application];
}

- (void)applicationDidEnterBackground:(UIApplication *)application
{   // Call super to change states properly for the kernel and services.
    [super applicationDidEnterBackground:application];
}

- (void)applicationWillEnterForeground:(UIApplication *)application
{   // Call super to change states properly for the kernel and services.
    [super applicationWillEnterForeground:application];
}

- (void)applicationDidBecomeActive:(UIApplication *)application
{   // Call super to change states properly for the kernel and services.
    [super applicationDidBecomeActive:application];
}

- (void)applicationWillTerminate:(UIApplication *)application
{   // Call super to change states properly for the kernel and services.
    [super applicationWillTerminate:application];
}

#pragma mark - Configuration paths
/* This property is used by the RTAppDelegate to read the defaults for keyvalue store in
 any namespace. This usually has to be a path to a directory in packages/yahoo.application.mojito_app_hybrid_example
 that has the default values. The defaults values are stored in JSON format with filename <storeName>.json
 */
- (NSString *)defaultsKeyValueStorePath
{
    NSString *resourcePath = [[NSBundle mainBundle] resourcePath];
    return [resourcePath stringByAppendingPathComponent:@"packages/yahoo.application.mojito_app_hybrid_example/defaults"];
}

/* This property is used by the RTAppDelegate to write settings that are updated for keyvalue store in
 any namespace. This has to be a path to a directory in Library directory in the application bundle.
 The values are stored in JSON format with filename <storeName>.json
 */

- (NSString *)customKeyValueStorePath
{
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSLibraryDirectory, NSUserDomainMask, YES);
    NSString *libraryPath = [paths objectAtIndex:0];
    
    NSString *customValuesPath = [libraryPath stringByAppendingPathComponent:@"custom"];
    if (![[NSFileManager defaultManager] fileExistsAtPath:customValuesPath]) {
        [[NSFileManager defaultManager] createDirectoryAtPath:customValuesPath withIntermediateDirectories:YES attributes:nil error:0];
    }
    
    return customValuesPath;
}

#pragma mark RTViewControllerDelegate

- (UIViewController *)rootViewController
{   // The top-most view controller for our application.
    return [self.window rootViewController];
}

@end
