import { useState } from 'react';

export function useShare() {
  const [copied, setCopied] = useState(false);
  const shareText = "I tried the Ultimate Citizenship Calculator and apparently I shop like I'm in India 😂🛍️🇮🇳 Find out yours!";
  
  // You would typically use window.location.href, but we'll use a placeholder for the demo
  const shareUrl = "https://citizenship-calculator.demo"; 

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`${shareText}\n${shareUrl}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleTwitterShare = () => {
    const text = encodeURIComponent(shareText);
    const url = encodeURIComponent(shareUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  return { handleCopy, handleWhatsAppShare, handleTwitterShare, copied };
}
