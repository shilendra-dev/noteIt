import backgroundImage from "../../assets/image_wallpaper.jpg";

export default function SignUpImage() {
  return (
    <div className="hidden lg:block w-1/2 rounded-2xl m-2 overflow-hidden">
      <img
        src={backgroundImage}
        alt="Background"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
