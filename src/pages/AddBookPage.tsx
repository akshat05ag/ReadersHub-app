
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useBooks } from "@/contexts/BookContext";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Image, Upload } from "lucide-react";

const AddBookPage = () => {
  const { currentUser } = useAuth();
  const { addBook } = useBooks();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    location: "",
    contact: currentUser?.email || "",
  });

  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenreChange = (value: string) => {
    setFormData((prev) => ({ ...prev, genre: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) return;
    
    setIsLoading(true);
    
    try {
      addBook({
        ...formData,
        ownerId: currentUser.id,
        ownerName: currentUser.name,
        coverImage: coverImage || `https://source.unsplash.com/random/300x400/?book,${encodeURIComponent(formData.title)}`,
      });
      
      navigate("/browse");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout requireAuth>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Add a New Book</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Book Details</CardTitle>
            <CardDescription>
              Enter the details of the book you want to share
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Book title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="author">Author *</Label>
                <Input
                  id="author"
                  name="author"
                  placeholder="Book author"
                  required
                  value={formData.author}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="genre">Genre</Label>
                <Select
                  value={formData.genre}
                  onValueChange={handleGenreChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fiction">Fiction</SelectItem>
                    <SelectItem value="Non-Fiction">Non-Fiction</SelectItem>
                    <SelectItem value="Science Fiction">Science Fiction</SelectItem>
                    <SelectItem value="Fantasy">Fantasy</SelectItem>
                    <SelectItem value="Romance">Romance</SelectItem>
                    <SelectItem value="Mystery">Mystery</SelectItem>
                    <SelectItem value="Biography">Biography</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Book Cover Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="coverImage">Book Cover</Label>
                <div className="flex gap-4 items-start">
                  <div 
                    className={`relative border rounded-md flex items-center justify-center cursor-pointer
                      ${coverImage ? 'w-32 h-40 border-0 overflow-hidden' : 'w-32 h-40 border-dashed p-2 bg-muted/50'}`}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {coverImage ? (
                      <img 
                        src={coverImage} 
                        alt="Book cover" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center">
                        <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Upload cover</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <Input
                      ref={fileInputRef}
                      id="coverImage"
                      name="coverImage"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <p className="text-sm text-muted-foreground">
                      Upload a book cover image (optional)
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      A default cover will be generated if none is provided
                    </p>
                    
                    {coverImage && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        className="mt-2"
                        onClick={() => setCoverImage(null)}
                      >
                        Remove Image
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="City, State"
                  required
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact">Contact Information *</Label>
                <Input
                  id="contact"
                  name="contact"
                  placeholder="Email or phone number"
                  required
                  value={formData.contact}
                  onChange={handleChange}
                />
                <p className="text-xs text-muted-foreground">
                  This will be visible to users interested in your book
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/browse")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Adding Book..." : "Add Book"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default AddBookPage;
