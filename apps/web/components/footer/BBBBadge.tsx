import Image from "next/image";

const BBB_PROFILE_URL =
  "https://www.bbb.org/ca/mb/winnipeg/profile/real-estate/chapter-real-estate-inc-0057-1000011965";

export default function BBBBadge() {
  return (
    <a href={BBB_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center">
      <Image src="/bbb.png" alt="BBB Accredited Business" width={120} height={84} className="h-30 w-auto" />
    </a>
  );
}
