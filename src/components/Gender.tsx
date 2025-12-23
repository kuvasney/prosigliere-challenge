interface GenderProps {
  gender: string | null | undefined;
}

export default function Gender({ gender }: GenderProps) {
  if (gender === "male") {
    return <span title="Male">♂️</span>;
  }
  
  if (gender === "female") {
    return <span title="Female">♀️</span>;
  }
  
  return <span title="Unknown"></span>;
}