export default function VideoModal({
  url,
  onClose,
}: {
  url: string;
  onClose: () => void;
}) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
    >
      <div className="w-[90%] md:w-[900px] aspect-video">
        <iframe
          src={url}
          className="w-full h-full rounded-xl"
          allowFullScreen
        />
      </div>
    </div>
  );
}
