
import React from "react";
import { Mail, Phone, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface QuickContactProps {
  contact: string;
  ownerName: string;
  title: string;
}

const QuickContact = ({ contact, ownerName, title }: QuickContactProps) => {
  const isEmail = contact.includes("@");
  
  const handleQuickContact = () => {
    if (isEmail) {
      window.location.href = `mailto:${contact}?subject=Regarding your book: ${title}`;
    } else {
      window.location.href = `tel:${contact}`;
    }
    
    toast({
      title: "Contact Information",
      description: `Contacting ${ownerName} regarding "${title}"`,
    });
  };

  return (
    <div className="flex items-center text-sm text-muted-foreground">
      {isEmail ? (
        <Mail className="h-4 w-4 mr-1" />
      ) : (
        <Phone className="h-4 w-4 mr-1" />
      )}
      <span className="ml-1">{contact}</span>
      <Button 
        variant="ghost" 
        size="icon" 
        className="ml-1 h-6 w-6" 
        onClick={handleQuickContact}
        title={`Quick contact ${ownerName}`}
      >
        <ExternalLink className="h-3 w-3" />
      </Button>
    </div>
  );
};

export default QuickContact;