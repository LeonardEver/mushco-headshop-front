import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import api from "@/services/api";
import { Product } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        // Assume que seu backend aceita ?search=... ou filtra no front se necessário
        const response = await api.get('/products');
        const allProducts: Product[] = response.data.data || [];
        
        // Filtragem simples no Frontend (ideal seria filtro no backend: /products?search=query)
        const filtered = allProducts.filter(p => 
            p.name.toLowerCase().includes(query.toLowerCase()) || 
            p.description?.toLowerCase().includes(query.toLowerCase())
        );
        
        setProducts(filtered);
      } catch (error) {
        console.error("Erro na busca:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    } else {
        setLoading(false);
    }
  }, [query]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8 pt-24">
        <h1 className="text-2xl font-bold mb-4">
            Resultados para: <span className="text-primary">"{query}"</span>
        </h1>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-[300px] w-full" />)}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhum produto encontrado.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Search;