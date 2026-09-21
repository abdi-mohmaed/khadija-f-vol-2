import sharp from 'sharp';

async function generateFavicon() {
    const input = 'public/logo-small@2x.png';
    const meta = await sharp(input).metadata();

    // Make the bounding box a square based on the longest side + some margin
    // Since it's going to be a favicon, we will resize it down to 180x180

    await sharp(input)
        .resize({
            width: 180,
            height: 180,
            fit: 'contain',
            background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .toFormat('png')
        .toFile('public/favicon.png');

    console.log('Successfully generated public/favicon.png at 180x180');
}

generateFavicon().catch(console.error);
