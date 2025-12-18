export const dataURLtoBlob = (dataurl: string): Blob => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
};

export const compressImage = async (blob: Blob): Promise<Blob> => {
    try {
        let imageSource: ImageBitmap | HTMLImageElement;
        let width: number;
        let height: number;

        if (typeof createImageBitmap !== 'undefined') {
            imageSource = await createImageBitmap(blob);
            width = imageSource.width;
            height = imageSource.height;
        } else {

            imageSource = await new Promise<HTMLImageElement>((resolve, reject) => {
                const img = new Image();
                const url = URL.createObjectURL(blob);
                img.onload = () => {
                    URL.revokeObjectURL(url);
                    resolve(img);
                };
                img.onerror = () => {
                    URL.revokeObjectURL(url);
                    reject(new Error('Failed to load image'));
                };
                img.src = url;
            });
            width = imageSource.width;
            height = imageSource.height;
        }

        const MAX_SIZE = 1024;

        if (width > height && width > MAX_SIZE) {
            height = (height * MAX_SIZE) / width;
            width = MAX_SIZE;
        } else if (height > MAX_SIZE) {
            width = (width * MAX_SIZE) / height;
            height = MAX_SIZE;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Failed to get canvas context');

        ctx.drawImage(imageSource, 0, 0, width, height);


        if (imageSource instanceof ImageBitmap) {
            imageSource.close();
        }

        return new Promise((resolve, reject) => {
            canvas.toBlob(
                (compressedBlob) => {
                    if (compressedBlob) {
                        resolve(compressedBlob);
                    } else {
                        reject(new Error('Compression failed'));
                    }
                },
                'image/webp',
                0.7
            );
        });
    } catch (error) {
        console.error('Image compression error:', error);
        throw error;
    }
};
