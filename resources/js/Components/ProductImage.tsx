import * as React from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallback?: string;
    alt: string;
    className?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({
                                                              src,
                                                              alt,
                                                              fallback = "/images/fallback.png",
                                                              className,
                                                              ...props
                                                          }) => {
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [hasError, setHasError] = React.useState(false);

    return (
        <div className={cn("relative aspect-square overflow-hidden rounded-2xl", className)}>
            {!isLoaded && <Skeleton className="absolute inset-0 w-full h-full" />}
            <img
                src={hasError ? fallback : src}
                alt={alt}
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
                onError={() => setHasError(true)}
                className={cn(
                    "object-cover w-full h-full transition-transform duration-300 ease-in-out hover:scale-105",
                    !isLoaded && "hidden"
                )}
                {...props}
            />
        </div>
    );
};
