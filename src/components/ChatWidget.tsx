import Script from "next/script";

export function ChatWidget() {
  const widgetSrc = process.env.NEXT_PUBLIC_CHAT_WIDGET_SRC;

  if (!widgetSrc) {
    return null;
  }

  return (
    <Script
      src={widgetSrc}
      strategy="afterInteractive"
    />
  );
}
