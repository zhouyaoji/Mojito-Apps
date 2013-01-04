//
//  RTViewControllerDelegate.h
//  ychromert
//
//  Created by Anand Subba Rao on 3/28/12.
//  Copyright (c) 2012 Yahoo! Inc. All rights reserved.
//

#import <Foundation/Foundation.h>

@class UIViewController;

/* This used used to provide a reference to a UIViewController for ychromert objects that require
 to display other view controllers */
@protocol RTViewControllerDelegate <NSObject>
- (UIViewController *)rootViewController;
@end
