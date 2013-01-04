//
//  RTLocationManager.h
//  ychromert
//
//  Created by Rongrong Zhong on 3/29/12.
//  Copyright (c) 2012 Yahoo! Inc. All rights reserved.
//

#import <CoreLocation/CoreLocation.h>

@class RTLocationManager;

@protocol GeoServiceManagerDelegate <NSObject>
@optional
/*
 *  locationManager:didUpdateToLocation:fromLocation:
 *  
 *  Similar to the one in CLLocationManager, except using RTLocationManager.
 *    Invoked when a new location is available. oldLocation may be nil if there is no previous location
 *    available.
 */
- (void)locationManager:(RTLocationManager *)manager
	didUpdateToLocation:(CLLocation *)newLocation
           fromLocation:(CLLocation *)oldLocation;

/*
 *  locationManager:didFailWithError:
 *  
 *  Similar to the one in CLLocationManager, except using RTLocationManager.
 *    Invoked when an error has occurred. Error types are defined in "CLError.h".
 */
- (void)locationManager:(RTLocationManager *)manager
       didFailWithError:(NSError *)error;

/*
 *  locationManager:didChangeAuthorizationStatus:
 *  
 *  Similar to the one in CLLocationManager, except using RTLocationManager.
 *    Invoked when the authorization status changes for this application.
 */
- (void)locationManager:(RTLocationManager *)manager didChangeAuthorizationStatus:(CLAuthorizationStatus)status;
@end

@protocol CompassServiceManagerDelegate <NSObject>
@optional
/*
 *  locationManager:didUpdateHeading:
 *  
 *  Similar to the one in CLLocationManager, except using RTLocationManager.
 *    Invoked when a new heading is available.
 */
- (void)locationManager:(RTLocationManager *)manager
       didUpdateHeading:(CLHeading *)newHeading;

/*
 *  locationManager:shouldDisplayHeadingCalibrationForDuration:
 *
 *  Similar to the one in CLLocationManager, except using RTLocationManager.
 *    Invoked when a new heading is available. Return YES to display heading calibration info. The display 
 *    will remain until heading is calibrated, unless dismissed early via dismissHeadingCalibrationDisplay.
 */
- (BOOL)locationManagerShouldDisplayHeadingCalibration:(RTLocationManager *)manager;

/*
 *  locationManager:didFailWithError:
 *  
 *  Similar to the one in CLLocationManager, except using RTLocationManager.
 *    Invoked when an error has occurred. Error types are defined in "CLError.h".
 */
- (void)locationManager:(RTLocationManager *)manager
       didFailWithError:(NSError *)error;

/*
 *  locationManager:didChangeAuthorizationStatus:
 *  
 *  Similar to the one in CLLocationManager, except using RTLocationManager.
 *    Invoked when the authorization status changes for this application.
 */
- (void)locationManager:(RTLocationManager *)manager didChangeAuthorizationStatus:(CLAuthorizationStatus)status;
@end

@interface RTLocationManager : CLLocationManager <CLLocationManagerDelegate>
@property (nonatomic, retain) id<GeoServiceManagerDelegate> geoServiceDelegate;
@property (nonatomic, retain) id<CompassServiceManagerDelegate> compassServiceDelegate;
@end
