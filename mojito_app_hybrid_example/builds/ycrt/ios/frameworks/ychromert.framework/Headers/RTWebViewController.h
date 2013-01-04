//
//  RTWebViewController.h
//  ychromert
//
//  This is the view controller class that will contain the application's RTWebView.
//
//  Clients should subclass this class and at least load the URL for the web-vew like:
//
// - (void)viewDidAppear:(BOOL)animated
// {
//     [super viewDidAppear:animated];
//    
//     // Load the web view's main content.
//     NSURL *url = [NSURL URLWithString:@"ychromert://yahoo.com/yahoo.application.myapp/index.html"];
//     NSURLRequest *request = [NSURLRequest requestWithURL:url];
//     [self.webView loadRequest:request];
// }
//
//  If you are using your own class to hook up the webview then look at the .m and implement those changes in your subclass.
//
//  Created by Anne-lise Hassenklover on 3/14/12.
//  Copyright (c) 2012 Yahoo! Inc. All rights reserved.
//

#import <UIKit/UIKit.h>

@class RTWebView;

@interface RTWebViewController : UIViewController

@property(nonatomic, retain) IBOutlet RTWebView *webView; // Remember to hook this up in your xib.

@end