import React, { useState } from "react"
import { View, Text, Pressable, StyleSheet, ViewStyle } from "react-native"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from "react-native-reanimated"
import { Ionicons } from "@expo/vector-icons"

type AccordionProps = {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
  containerStyle?: ViewStyle
}

export default function Accordion({
  title,
  children,
  defaultOpen = false,
  containerStyle,
}: AccordionProps) {
  const open = useSharedValue(defaultOpen ? 1 : 0)
  const [height, setHeight] = useState(0)

  const contentStyle = useAnimatedStyle(() => ({
    height: height * open.value,
    opacity: open.value,
  }))

  const iconStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${interpolate(open.value, [0, 1], [0, 180])}deg`,
      },
    ],
  }))

  const toggle = () => {
    open.value = withTiming(open.value === 0 ? 1 : 0, {
      duration: 250,
    })
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <Pressable onPress={toggle} style={styles.header}>
        <Text style={styles.title}>{title}</Text>

        <Animated.View style={iconStyle}>
          <Ionicons name="chevron-down" size={20} color="#333" />
        </Animated.View>
      </Pressable>

      {/* Hidden content for measuring */}
      <View
        style={styles.hidden}
        onLayout={e => setHeight(e.nativeEvent.layout.height)}
      >
        {children}
      </View>

      {/* Animated content */}
      <Animated.View style={[styles.content, contentStyle]}>
        {children}
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingVertical: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  content: {
    overflow: "hidden",
    marginTop: 8,
    paddingHorizontal: 16,
  },
  hidden: {
    position: "absolute",
    opacity: 0,
    zIndex: -1,
  },
})
