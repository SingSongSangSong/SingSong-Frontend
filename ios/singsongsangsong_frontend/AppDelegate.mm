#import "AppDelegate.h"
#import <Firebase.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTLinkingManager.h>
#import <RNCKakaoUser/RNCKakaoUserUtil.h>
// #import <FBSDKCoreKit/FBSDKCoreKit-Swift.h>
// #import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <AuthenticationServices/AuthenticationServices.h>
#import <SafariServices/SafariServices.h>
#import <FBSDKCoreKit/FBSDKCoreKit-Swift.h>
// #import <AppTrackingTransparency/AppTrackingTransparency.h>
// #import <FBAEMKit/FBAEMKit-Swift.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"singsongsangsong_frontend";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  [FIRApp configure];
  [[FBSDKApplicationDelegate sharedInstance] application:application didFinishLaunchingWithOptions:launchOptions];
  // return YES;
  // [[FBSDKApplicationDelegate sharedInstance] application:application didFinishLaunchingWithOptions:launchOptions];
    //  [[FBSDKApplicationDelegate sharedInstance] application:application
    //                    didFinishLaunchingWithOptions:launchOptions];

  // [FBSDKSettings setAdvertiserTrackingEnabled:YES];
  // 광고 추적 권한 요청
  // if (@available(iOS 14, *)) {
  //   [ATTrackingManager requestTrackingAuthorizationWithCompletionHandler:^(ATTrackingManagerAuthorizationStatus status) {
  //     // 광고 추적 동의 상태에 따라 설정
  //     if (status == ATTrackingManagerAuthorizationStatusAuthorized) {
  //       [FBSDKSettings setAdvertiserTrackingEnabled:YES];
  //     } else {
  //       [FBSDKSettings setAdvertiserTrackingEnabled:NO];
  //     }
  //   }];
  // } else {
  //   [FBSDKSettings setAdvertiserTrackingEnabled:YES];
  // } 

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {

  // 카카오톡에서 전달된 URL scheme면 이 앱에서 핸들링하는 로직입니다.
  if([RNCKakaoUserUtil isKakaoTalkLoginUrl:url]) {
    return [RNCKakaoUserUtil handleOpenUrl:url];
  }

  // if ([[FBSDKApplicationDelegate sharedInstance] application:application openURL:url options:options]) {
  //   return YES;
  // }

  // if ([RCTLinkingManager application:application openURL:url options:options]) {
  //   return YES;
  // }

  return [super application:application openURL:url options:options] || [RCTLinkingManager application:application openURL:url options:options];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}
@end
