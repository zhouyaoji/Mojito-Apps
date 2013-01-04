//
//  RTWebView.h
//  ychromert
//
//  Created by Rongrong Zhong on 2/17/12.
//  Copyright (c) 2012 Yahoo! Inc. All rights reserved.
//

#import <UIKit/UIKit.h>

@class RTWebView;

@protocol RTWebViewDelegate <NSObject>
@required
- (BOOL)webView:(RTWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType;
- (void)webViewDidStartLoad:(RTWebView *)webView;
- (void)webViewDidFinishLoad:(RTWebView *)webView;
- (void)webView:(RTWebView *)webView didFailLoadWithError:(NSError *)error;
@end


@interface RTWebView : UIWebView<UIWebViewDelegate>
@property (nonatomic, assign) id<RTWebViewDelegate> contextDelegate;

// Proxy delegate calls so we can intercept them
// Subclasses should override these pseudo-delegate methods instead of the UIWebViewDelegate ones
- (BOOL)shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType;
- (void)didStartLoad;
- (void)didFinishLoad;
- (void)didFailLoadWithError:(NSError *)error;



@end
