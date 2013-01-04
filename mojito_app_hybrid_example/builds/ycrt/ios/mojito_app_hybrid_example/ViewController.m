//
//  ViewController.m
//  template
//
//  Copyright (c) 2012 Yahoo! Inc. All rights reserved.
//

#import "ViewController.h"
#import "AppDelegate.h"

#import <ychromert/YChromeRT.h>
#import <ychromert/RTWebView.h>


@implementation ViewController

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Release any cached data, images, etc that aren't in use.
}

#pragma mark - View lifecycle

- (void)viewDidLoad
{   // Do any additional setup after loading the view, typically from a nib.
    [super viewDidLoad];
    self.webView.scrollView.bounces = NO;
    // Load the web view's content.
    NSURL *url = [NSURL URLWithString:@"ychromert://yahoo.com/yahoo.application.mojito_app_hybrid_example/index.html"];
    NSURLRequest *request = [NSURLRequest requestWithURL:url];
    [self.webView loadRequest:request];
}

- (void)viewDidUnload
{   // Release any retained subviews of the main view.
    [super viewDidUnload];
}

- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
}

- (void)viewDidAppear:(BOOL)animated
{
    [super viewDidAppear:animated];
}

- (void)viewWillDisappear:(BOOL)animated
{
	[super viewWillDisappear:animated];
}

- (void)viewDidDisappear:(BOOL)animated
{
	[super viewDidDisappear:animated];
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    // Return YES for supported orientations
    if ([[UIDevice currentDevice] userInterfaceIdiom] == UIUserInterfaceIdiomPhone) {
        return (interfaceOrientation != UIInterfaceOrientationPortraitUpsideDown);
    } else {
        return YES;
    }
}

@end
