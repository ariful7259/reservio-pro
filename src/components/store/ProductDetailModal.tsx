import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Package, 
  MessageCircle, 
  ShoppingCart, 
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  images: string[] | null;
  category: string | null;
  stock: number | null;
}

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  storeName?: string;
  storePhone?: string;
  whatsappEnabled?: boolean;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  storeName,
  storePhone,
  whatsappEnabled
}) => {
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const images = product.images || [];
  const hasMultipleImages = images.length > 1;
  const isOutOfStock = product.stock !== null && product.stock <= 0;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('bn-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const handleWhatsAppOrder = () => {
    const phone = storePhone?.replace(/[^0-9]/g, '') || '8801XXXXXXXXX';
    const message = encodeURIComponent(
      `হ্যালো! আমি ${storeName} থেকে "${product.name}" (${quantity} টি) অর্ডার করতে চাই।\n\nমূল্য: ${formatPrice(product.price * quantity)}`
    );
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: `${product.name} - ${formatPrice(product.price)}`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        navigator.clipboard.writeText(window.location.href);
        toast({ title: "লিংক কপি হয়েছে!" });
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: "লিংক কপি হয়েছে!" });
    }
  };

  const handleQuantityChange = (delta: number) => {
    const newQty = quantity + delta;
    if (newQty >= 1 && (product.stock === null || newQty <= product.stock)) {
      setQuantity(newQty);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => { onClose(); setCurrentImageIndex(0); setQuantity(1); }}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative bg-muted aspect-square md:aspect-auto md:min-h-[400px]">
            {images.length > 0 ? (
              <>
                <img
                  src={images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {hasMultipleImages && (
                  <>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full opacity-80 hover:opacity-100"
                      onClick={handlePrevImage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full opacity-80 hover:opacity-100"
                      onClick={handleNextImage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    {/* Image indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {images.map((_, idx) => (
                        <button
                          key={idx}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            idx === currentImageIndex 
                              ? 'bg-primary' 
                              : 'bg-white/60 hover:bg-white/80'
                          }`}
                          onClick={() => setCurrentImageIndex(idx)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package className="h-16 w-16 text-muted-foreground" />
              </div>
            )}
            
            {/* Stock badges */}
            {isOutOfStock && (
              <Badge variant="destructive" className="absolute top-4 left-4">
                স্টক শেষ
              </Badge>
            )}
            {product.stock !== null && product.stock > 0 && product.stock <= 5 && (
              <Badge className="absolute top-4 left-4 bg-orange-500">
                মাত্র {product.stock} টি বাকি
              </Badge>
            )}
          </div>

          {/* Product Info Section */}
          <div className="p-6 flex flex-col">
            <DialogHeader className="text-left mb-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  {product.category && (
                    <Badge variant="secondary" className="mb-2">
                      {product.category}
                    </Badge>
                  )}
                  <DialogTitle className="text-xl">{product.name}</DialogTitle>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={handleShare}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </DialogHeader>

            {/* Price */}
            <div className="mb-4">
              <p className="text-3xl font-bold text-primary">
                {formatPrice(product.price)}
              </p>
              {product.stock !== null && product.stock > 0 && (
                <p className="text-sm text-muted-foreground mt-1">
                  স্টকে আছে: {product.stock} টি
                </p>
              )}
            </div>

            <Separator className="my-4" />

            {/* Description */}
            {product.description && (
              <div className="mb-4 flex-1">
                <h4 className="font-medium mb-2">বিবরণ</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            )}

            {/* Quantity Selector */}
            {!isOutOfStock && (
              <div className="mb-4">
                <h4 className="font-medium mb-2">পরিমাণ</h4>
                <div className="flex items-center gap-3">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium text-lg">
                    {quantity}
                  </span>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleQuantityChange(1)}
                    disabled={product.stock !== null && quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground ml-2">
                    মোট: {formatPrice(product.price * quantity)}
                  </span>
                </div>
              </div>
            )}

            <Separator className="my-4" />

            {/* Action Buttons */}
            <div className="space-y-3 mt-auto">
              {whatsappEnabled && !isOutOfStock && (
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={handleWhatsAppOrder}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp এ অর্ডার করুন
                </Button>
              )}
              <Button 
                variant="outline" 
                className="w-full"
                disabled={isOutOfStock}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {isOutOfStock ? 'স্টক শেষ' : 'কার্টে যোগ করুন'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;