import "./productPage.scss";

import InstrumentPage from "@/app/components/ProductPage/InstrumentPage";

export default async function Page(): Promise<JSX.Element> {
  return (
    <div className={"bg-amber-50"}>
      <InstrumentPage category={"viola"} />
    </div>
  );
}
