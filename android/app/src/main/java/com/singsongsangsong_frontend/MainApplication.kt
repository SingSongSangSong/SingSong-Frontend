package com.singsongsangsong_frontend

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.soloader.SoLoader
import com.microsoft.codepush.react.CodePush;
import com.dooboolab.audiorecorderplayer.RNAudioRecorderPlayerPackage;
// import com.facebook.FacebookSdk;
// import com.facebook.appevents.AppEventsLogger;
// import com.lugg.RNCConfig.RNCConfigPackage;
// import com.facebook.react.bridge.JSIModulePackage; // 추가
// import com.swmansion.reanimated.ReanimatedJSIModulePackage; // 추가

class MainApplication : Application(), ReactApplication {

  override val reactNativeHost: ReactNativeHost =
      object : DefaultReactNativeHost(this) {
        override fun getPackages(): List<ReactPackage> =
            PackageList(this).packages.apply {
              // Packages that cannot be autolinked yet can be added manually here, for example:
              // add(MyReactNativePackage())
              // add(RNCConfigPackage())
              // add(new RNAudioRecorderPlayerPackage())
            }

        override fun getJSMainModuleName(): String = "index"

        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

        override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
        override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED

        override fun getJSBundleFile(): String? {
            return CodePush.getJSBundleFile()
        }
      }

  override val reactHost: ReactHost
    get() = getDefaultReactHost(applicationContext, reactNativeHost)

  override fun onCreate() {
    super.onCreate()
    SoLoader.init(this, false)
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      load()
    }
  }

// @Override
// protected JSIModulePackage getJSIModulePackage() {
//   return new ReanimatedJSIModulePackage(); // 추가
// }
}

// package com.singsongsangsong_frontend

// import android.app.Application
// import com.facebook.react.PackageList
// import com.facebook.react.ReactApplication
// import com.facebook.react.ReactHost
// import com.facebook.react.ReactNativeHost
// import com.facebook.react.ReactPackage
// import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
// import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
// import com.facebook.react.defaults.DefaultReactNativeHost
// import com.facebook.soloader.SoLoader
// import com.swmansion.reanimated.ReanimatedJSIModulePackage // 추가
// import com.facebook.react.bridge.JSIModulePackage // 추가

// class MainApplication : Application(), ReactApplication {

//   override val reactNativeHost: ReactNativeHost =
//       object : DefaultReactNativeHost(this) {
//         override fun getPackages(): List<ReactPackage> =
//             PackageList(this).packages.apply {
//               // Packages that cannot be autolinked yet can be added manually here, for example:
//               // add(MyReactNativePackage())
//             }

//         override fun getJSMainModuleName(): String = "index"

//         override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

//         override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
//         override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED

//         override fun getJSIModulePackage(): JSIModulePackage {
//           return ReanimatedJSIModulePackage() // 추가
//         }
//       }

//   override val reactHost: ReactHost
//     get() = getDefaultReactHost(applicationContext, reactNativeHost)

//   override fun onCreate() {
//     super.onCreate()
//     SoLoader.init(this, false)
//     if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
//       // If you opted-in for the New Architecture, we load the native entry point for this app.
//       load()
//     }
//   }
// }
