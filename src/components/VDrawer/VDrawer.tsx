// src/components/VDrawer/VDrawer.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Modal,
  Animated,
  Pressable,
  Dimensions,
  PanResponder,
  Text,
  ScrollView,
  type ViewProps,
} from 'react-native';
import { X } from 'lucide-react-native';
import tw from '../../utils/tw';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export interface VDrawerProps extends ViewProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: React.ReactNode;
  showCloseButton?: boolean;
  height?: number | 'auto';
  snapPoints?: number[];
  enablePanDownToClose?: boolean;
  bottomAction?: React.ReactNode;
  scrollable?: boolean;
}

const VDrawer: React.FC<VDrawerProps> = ({
  visible,
  onClose,
  children,
  title,
  showCloseButton = true,
  height = 'auto',
  // snapPoints,
  enablePanDownToClose = true,
  bottomAction,
  scrollable = true,
  style,
  ...props
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setModalVisible(true);

      setTimeout(() => {
        Animated.parallel([
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            bounciness: 0,
            speed: 14,
          }),
          Animated.timing(backdropOpacity, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
          }),
        ]).start();
      }, 50);
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: SCREEN_HEIGHT,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setModalVisible(false);
        translateY.setValue(SCREEN_HEIGHT);
      });
    }
  }, [visible, translateY, backdropOpacity]);

  // Pan Responder hanya untuk drag handle area
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => enablePanDownToClose,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        const { dy } = gestureState;
        return enablePanDownToClose && dy > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        const { dy } = gestureState;
        if (dy > 0) {
          translateY.setValue(dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const { dy, vy } = gestureState;

        if (dy > 100 || vy > 0.5) {
          onClose();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            bounciness: 0,
          }).start();
        }
      },
    })
  ).current;

  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={tw.style('flex-1')}>
        {/* Backdrop */}
        <Animated.View
          style={[
            tw.style('absolute inset-0 bg-black'),
            {
              opacity: backdropOpacity.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5],
              }),
            },
          ]}
        >
          <Pressable style={tw.style('flex-1')} onPress={onClose} />
        </Animated.View>

        {/* Drawer Content */}
        <Animated.View
          style={[
            tw.style('absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl'),
            // eslint-disable-next-line react-native/no-inline-styles
            {
              transform: [{ translateY }],
              maxHeight: height === 'auto' ? '90%' : height,
            },
          ]}
        >
          {/* Drag Handle - Only this area has pan responder */}
          <View
            style={tw.style('items-center pt-3 pb-2')}
            {...panResponder.panHandlers}
          >
            <View style={tw.style('w-10 h-1 bg-gray-400 rounded-full')} />
          </View>

          {/* Header with Title and Close Button */}
          {title && (
            <>
              <View
                style={tw.style(
                  'flex-row items-center justify-between px-4 py-3'
                )}
              >
                {/* Title */}
                <View style={tw.style('flex-1')}>
                  {typeof title === 'string' ? (
                    <Text style={tw.style('text-xl font-bold text-gray-900')}>
                      {title}
                    </Text>
                  ) : (
                    title
                  )}
                </View>

                {/* Close Button */}
                {showCloseButton && (
                  <Pressable
                    onPress={onClose}
                    style={tw.style('p-2 -mr-2')}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <X size={24} color="#000" />
                  </Pressable>
                )}
              </View>

              {/* Divider */}
              <View style={tw.style('h-px bg-gray-200')} />
            </>
          )}

          {/* Content - Conditional ScrollView */}
          {scrollable ? (
            <ScrollView
              style={[tw.style('flex-1'), style]}
              contentContainerStyle={tw.style(
                'px-4',
                title ? 'pt-4' : 'pt-0',
                bottomAction ? 'pb-4' : 'pb-8'
              )}
              showsVerticalScrollIndicator={true}
              bounces={true}
              {...props}
            >
              {children}
            </ScrollView>
          ) : (
            <View
              style={[
                tw.style(
                  'px-4',
                  title ? 'pt-4' : 'pt-0',
                  bottomAction ? 'pb-4' : 'pb-8'
                ),
                style,
              ]}
              {...props}
            >
              {children}
            </View>
          )}

          {/* Bottom Action */}
          {bottomAction && (
            <>
              <View style={tw.style('h-px bg-gray-200')} />
              <View style={tw.style('px-4 py-4')}>{bottomAction}</View>
            </>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default VDrawer;

// // src/components/VDrawer/VDrawer.tsx
// import React, { useEffect, useRef, useState } from 'react';
// import {
//   View,
//   Modal,
//   Animated,
//   Pressable,
//   Dimensions,
//   PanResponder,
//   Text,
//   ScrollView,
//   type ViewProps,
// } from 'react-native';
// import { X } from 'lucide-react-native';
// import tw from '../../utils/tw';

// const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// export interface VDrawerProps extends ViewProps {
//   visible: boolean;
//   onClose: () => void;
//   children: React.ReactNode;
//   title?: React.ReactNode;
//   showCloseButton?: boolean;
//   height?: number | 'auto';
//   snapPoints?: number[];
//   enablePanDownToClose?: boolean;
//   bottomAction?: React.ReactNode;
// }

// const VDrawer: React.FC<VDrawerProps> = ({
//   visible,
//   onClose,
//   children,
//   title,
//   showCloseButton = true,
//   height = 'auto',
//   // snapPoints,
//   enablePanDownToClose = true,
//   bottomAction,
//   style,
//   ...props
// }) => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
//   const backdropOpacity = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     if (visible) {
//       setModalVisible(true);

//       setTimeout(() => {
//         Animated.parallel([
//           Animated.spring(translateY, {
//             toValue: 0,
//             useNativeDriver: true,
//             bounciness: 0,
//             speed: 14,
//           }),
//           Animated.timing(backdropOpacity, {
//             toValue: 1,
//             duration: 250,
//             useNativeDriver: true,
//           }),
//         ]).start();
//       }, 50);
//     } else {
//       Animated.parallel([
//         Animated.timing(translateY, {
//           toValue: SCREEN_HEIGHT,
//           duration: 250,
//           useNativeDriver: true,
//         }),
//         Animated.timing(backdropOpacity, {
//           toValue: 0,
//           duration: 250,
//           useNativeDriver: true,
//         }),
//       ]).start(() => {
//         setModalVisible(false);
//         translateY.setValue(SCREEN_HEIGHT);
//       });
//     }
//   }, [visible, translateY, backdropOpacity]);

//   // Pan Responder hanya untuk drag handle area
//   const panResponder = useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => enablePanDownToClose,
//       onMoveShouldSetPanResponder: (_, gestureState) => {
//         const { dy } = gestureState;
//         return enablePanDownToClose && dy > 5;
//       },
//       onPanResponderMove: (_, gestureState) => {
//         const { dy } = gestureState;
//         if (dy > 0) {
//           translateY.setValue(dy);
//         }
//       },
//       onPanResponderRelease: (_, gestureState) => {
//         const { dy, vy } = gestureState;

//         if (dy > 100 || vy > 0.5) {
//           onClose();
//         } else {
//           Animated.spring(translateY, {
//             toValue: 0,
//             useNativeDriver: true,
//             bounciness: 0,
//           }).start();
//         }
//       },
//     })
//   ).current;

//   return (
//     <Modal
//       visible={modalVisible}
//       transparent
//       animationType="none"
//       onRequestClose={onClose}
//       statusBarTranslucent
//     >
//       <View style={tw.style('flex-1')}>
//         {/* Backdrop */}
//         <Animated.View
//           style={[
//             tw.style('absolute inset-0 bg-black'),
//             {
//               opacity: backdropOpacity.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: [0, 0.5],
//               }),
//             },
//           ]}
//         >
//           <Pressable style={tw.style('flex-1')} onPress={onClose} />
//         </Animated.View>

//         {/* Drawer Content */}
//         <Animated.View
//           style={[
//             tw.style('absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl'),
//             // eslint-disable-next-line react-native/no-inline-styles
//             {
//               transform: [{ translateY }],
//               maxHeight: height === 'auto' ? '90%' : height,
//             },
//           ]}
//         >
//           {/* Drag Handle - Only this area has pan responder */}
//           <View
//             style={tw.style('items-center pt-3 pb-2')}
//             {...panResponder.panHandlers}
//           >
//             <View style={tw.style('w-10 h-1 bg-gray-400 rounded-full')} />
//           </View>

//           {/* Header with Title and Close Button */}
//           {title && (
//             <>
//               <View
//                 style={tw.style(
//                   'flex-row items-center justify-between px-4 py-3'
//                 )}
//               >
//                 {/* Title */}
//                 <View style={tw.style('flex-1')}>
//                   {typeof title === 'string' ? (
//                     <Text style={tw.style('text-xl font-bold text-gray-900')}>
//                       {title}
//                     </Text>
//                   ) : (
//                     title
//                   )}
//                 </View>

//                 {/* Close Button */}
//                 {showCloseButton && (
//                   <Pressable
//                     onPress={onClose}
//                     style={tw.style('p-2 -mr-2')}
//                     hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//                   >
//                     <X size={24} color="#000" />
//                   </Pressable>
//                 )}
//               </View>

//               {/* Divider */}
//               <View style={tw.style('h-px bg-gray-200')} />
//             </>
//           )}

//           {/* Scrollable Content */}
//           <ScrollView
//             style={[tw.style('flex-1'), style]}
//             contentContainerStyle={tw.style(
//               'px-4',
//               title ? 'pt-4' : 'pt-0',
//               bottomAction ? 'pb-4' : 'pb-8'
//             )}
//             showsVerticalScrollIndicator={true}
//             bounces={true}
//             {...props}
//           >
//             {children}
//           </ScrollView>

//           {/* Bottom Action */}
//           {bottomAction && (
//             <>
//               <View style={tw.style('h-px bg-gray-200')} />
//               <View style={tw.style('px-4 py-4')}>{bottomAction}</View>
//             </>
//           )}
//         </Animated.View>
//       </View>
//     </Modal>
//   );
// };

// export default VDrawer;
