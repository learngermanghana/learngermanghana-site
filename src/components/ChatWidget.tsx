import Script from "next/script";

export function ChatWidget() {
  const widgetSrc =
    process.env.NEXT_PUBLIC_CHAT_WIDGET_SRC ??
    "https://embed.tawk.to/698851c5697d591c36fe6948/1jgu7urhq";

  return (
    <Script
      id="tawk-widget"
      strategy="afterInteractive"
      onLoad={() => {
        // @ts-ignore
        window?.Tawk_API?.hideWidget?.();
      }}
    >
      {`var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='${widgetSrc}';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();`}
    </Script>
  );
}
