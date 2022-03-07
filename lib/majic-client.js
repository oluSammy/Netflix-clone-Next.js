import { Magic } from "magic-sdk";

// Construct with an API key:
const createMagic = () => {
  return typeof window !== "undefined"
    ? new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLIC_KEY)
    : null;
};

const magicKey = createMagic();

export default magicKey;
