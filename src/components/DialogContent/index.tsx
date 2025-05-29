const topics = [
  {
    id: 1,
    text: "Fracciona tu pago solo con un coste fijo por cuota.",
    iconUrl: "/icon1.png",
  },
  { id: 2, text: "Ahora solo pagas la primera cuota.", iconUrl: "/icon2.png" },
  {
    id: 3,
    text: "El resto de pagos se cargarán automáticamente a tu tarjeta.",
    iconUrl: "/icon3.png",
  },
];

interface Props {
  fee: string;
}

const DialogContent: React.FC<Props> = ({ fee }) => {
  return (
    <>
      <ul className="flex flex-col space-y-4">
        {topics.map(({ id, text, iconUrl }) => (
          <li key={id} className="relative pl-4">
            <span className="absolute left-0 top-1/2 -translate-y-1/2">•</span>

            <span className="flex items-center justify-between w-full">
              <span className="flex-1">{text}</span>
              <img
                src={iconUrl}
                alt="icon"
                className="w-6 h-6 border flex-shrink-0 ml-4"
              />
            </span>
          </li>
        ))}
      </ul>

      <p className="text-xs text-center text-gray-600 mt-6">
        Además en el importe mostrado ya se incluye la cuota única mensual de{" "}
        {fee}/mes, por lo que no tendrás ninguna sorpresa.
      </p>
    </>
  );
};

export default DialogContent;
