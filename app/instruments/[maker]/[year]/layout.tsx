import "../../../global.scss";

type Props = {
  params: Promise<{ maker: string; year: string }>;
};

export async function generateMetadata({ params }: Props) {
  const maker = (await params).maker;
  const year = (await params).year;
  return {
    title: `Instrument | ${maker} ${year}`,
    description: `Product made by ${maker} in the year ${year}`,
    keywords: ["Violins", "Violins Minneapolis", `${maker}`],
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
