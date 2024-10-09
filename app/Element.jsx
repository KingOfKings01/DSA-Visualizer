import { useSpring, animated } from "@react-spring/web";

export default function Element({ num }) {

    const [springs, api] = useSpring(() => ({
        from: { x: 0 },
    }))

    return (
        <animated.div
            style={springs}
        >
            {num}
        </animated.div>
    )
}
