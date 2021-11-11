export default function Torrent({ torrent }) {
  return (
    <div className="torrent">
      <a href={torrent.magnet}>
        <span className="name">{torrent.name}</span>
      </a>
      <div className="info">
        <span className="size">{torrent.size}</span>
        <span className="seeders">
          <b>S</b>: {torrent.seeders}
        </span>
        <span className="leechers">
          <b>L</b>: {torrent.leechers}
        </span>
        <span className="uploaded_at">{torrent.uploaded_at}</span>
        <span className="uploaded_by">{torrent.uploader}</span>
      </div>
      <div className="actions">
        <a href={torrent.magnet}>Download</a>
        {torrent.magnet.startsWith("magnet:?xt=urn:btih:") && (
          <a
            href={
              "https://webtor.io/show?magnet=" +
              encodeURIComponent(torrent.magnet)
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            Play on browser (Webtor)
          </a>
        )}
      </div>
    </div>
  );
}
