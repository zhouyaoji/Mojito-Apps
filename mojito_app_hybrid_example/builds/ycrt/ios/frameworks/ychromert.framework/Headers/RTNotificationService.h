//
//  RTNotificationService.h
//  ychromert
//
//  The notification service manages UIAlertViews put up via alert and confirm
//  Javascript calls.
//
//  Created by Anne-lise Hassenklover on 4/10/12.
//  Copyright (c) 2012 Yahoo! Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "RTService.h"

@interface RTNotificationService : RTService <UIAlertViewDelegate>

@end
