# Keyboard Bug Fix in Messages Page

## Problem

There were two issues with message input in page:
1. The message input field is slightly lowered and positioned behind the bottom navigation bar.

![bottom navigation bar bug](/assets/readme_images/2024-04-30_09-21.jpg)

2. There was an issue where the keyboard would cover the message input field in the messages page, making it difficult for users to see what they were typing.



## Solution

1. The solution for the first bug, was to wrap the chat component with the `SafeAreaView` component from React Native. This ensures that the chat component is always displayed within the safe area boundaries of the device, and not obscured by the navigation bar.
    ```typescript
    import { SafeAreaView } from 'react-native';

    <SafeAreaView>
        <GiftedChat 
        ...
        />
    </SafeAreaView>
    ```

2. The solution for the second bug involved installing two new libraries: `react-native-android-keyboard-adjust` and `react-native-keyboard-spacer`.
    ```typescript
    import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';

    AndroidKeyboardAdjust.setAdjustResize();
    ```

    ```typescript
    <GiftedChat
        ...
    />
    {Platform.OS == 'android' && <KeyboardSpacer />}
    ```

## Commits

List the commits related to the bug fix here. For example:

- Commit 1: "Fix bug: text input  behind bottom nav bar"
- Commit 2: "Fix bug: keybord cover message input"

## Result

![result](/assets/readme_images/fixed.gif)