import { useState } from "react";
import { Link } from "react-router";
import { Plus, Search, ArrowLeft, Mountain, Edit, Trash2 } from "lucide-react";

export function GenericManager({
  title,
  subtitle,
  data = [],
  columns = [],
  onDelete,
  createPath,
  editPathPrefix,
  searchPlaceholder = "Buscar...",
  entityName = "registro",
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((item) => {
    const normalize = (str) =>
      String(str)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    const term = normalize(searchTerm);
    return Object.values(item).some((val) => normalize(val).includes(term));
  });

  return (
    <div className="min-h-screen bg-neutral-100">
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              to="/admin/dashboard"
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="size-5 text-neutral-600" />
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-neutral-800">
                {title}
              </h1>
              <p className="text-sm text-neutral-600">{subtitle}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-neutral-400" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
          </div>
          <Link
            to={createPath}
            className="flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl transition-colors whitespace-nowrap"
          >
            <Plus className="size-5" />
            Novo {entityName}
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-neutral-200/50">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  {columns.map((col, idx) => (
                    <th
                      key={idx}
                      className="text-left px-6 py-4 text-sm font-medium text-neutral-500 uppercase tracking-wider"
                    >
                      {col.header}
                    </th>
                  ))}
                  <th className="text-right px-6 py-4 text-sm font-medium text-neutral-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {filteredData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={columns.length + 1}
                      className="px-6 py-12 text-center"
                    >
                      <Mountain className="size-12 text-neutral-300 mx-auto mb-3" />
                      <p className="text-neutral-500">
                        Nenhum {entityName} encontrado
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-neutral-50 transition-colors"
                    >
                      {columns.map((col, idx) => (
                        <td
                          key={idx}
                          className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700"
                        >
                          {col.render ? col.render(item) : item[col.key]}
                        </td>
                      ))}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`${editPathPrefix}/${item.id}/editar`}
                            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors group"
                            title="Editar"
                          >
                            <Edit className="size-4 text-neutral-400 group-hover:text-blue-600" />
                          </Link>
                          <button
                            onClick={() => onDelete(item.id)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                            title="Excluir"
                          >
                            <Trash2 className="size-4 text-neutral-400 group-hover:text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-neutral-500 font-medium">
          Mostrando {filteredData.length} de {data.length} {entityName}s
        </div>
      </div>
    </div>
  );
}
