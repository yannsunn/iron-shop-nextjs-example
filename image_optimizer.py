from PIL import Image
import os

def optimize_image(input_path, output_path=None, max_size=(2560, 1440), quality=95):
    """
    画像を最適化する関数
    
    Parameters:
    - input_path: 入力画像のパス
    - output_path: 出力画像のパス（Noneの場合は入力画像を上書き）
    - max_size: 最大サイズ（幅, 高さ）- デフォルトは2K解像度
    - quality: JPEG品質（0-100）- デフォルトは95
    """
    if output_path is None:
        output_path = input_path
        
    # 画像を開く
    with Image.open(input_path) as img:
        # 元の画像のサイズを取得
        original_width, original_height = img.size
        original_size = os.path.getsize(input_path) / 1024  # サイズをKBで取得
        
        # アスペクト比を維持しながらリサイズ
        ratio = min(max_size[0] / original_width, max_size[1] / original_height)
        if ratio < 1:
            new_size = (int(original_width * ratio), int(original_height * ratio))
            img = img.resize(new_size, Image.Resampling.LANCZOS)
        elif ratio > 1:
            # 元の画像が小さすぎる場合は拡大
            new_size = (int(original_width * ratio), int(original_height * ratio))
            img = img.resize(new_size, Image.Resampling.LANCZOS)
        
        # 画像を保存（最適化）
        img.save(output_path, 'JPEG', quality=quality, optimize=True)
        
        # 最適化後のサイズを取得
        optimized_size = os.path.getsize(output_path) / 1024
        
        return {
            'original_size': original_size,
            'optimized_size': optimized_size,
            'original_dimensions': (original_width, original_height),
            'new_dimensions': img.size
        }
        
def process_directory(input_dir='images', output_dir='optimized_images'):
    """
    ディレクトリ内の全ての画像を最適化する関数
    """
    # 出力ディレクトリが存在しない場合は作成
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    # 画像ファイルの拡張子
    image_extensions = ('.jpg', '.jpeg', '.png')
    
    # ディレクトリ内の全ファイルを処理
    for filename in os.listdir(input_dir):
        if filename.lower().endswith(image_extensions):
            input_path = os.path.join(input_dir, filename)
            output_path = os.path.join(output_dir, filename)
            
            try:
                result = optimize_image(input_path, output_path)
                print(f"\nProcessed: {filename}")
                print(f"Original size: {result['original_size']:.2f}KB")
                print(f"Optimized size: {result['optimized_size']:.2f}KB")
                print(f"Original dimensions: {result['original_dimensions']}")
                print(f"New dimensions: {result['new_dimensions']}")
            except Exception as e:
                print(f"Error processing {filename}: {str(e)}")

if __name__ == "__main__":
    # 最適化を実行
    process_directory()
    print("\nImage optimization complete!") 