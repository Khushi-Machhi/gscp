import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import PageHeader from "@/components/site/PageHeader";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

const fetchSupabaseSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data;
};

const fetchProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
};

const fetchCategories = async () => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const formatError = (err: any) => {
  try {
    if (!err) return "Unknown error";
    if (err instanceof Error) return err.message;
    if (typeof err === "string") return err;
    if (err?.message) return err.message;
    return JSON.stringify(err);
  } catch (e) {
    return String(err);
  }
};

const Admin = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["supabase-session"],
    queryFn: fetchSupabaseSession,
    retry: false,
  });

  const {
    data: products,
    error: productsError,
    isLoading: productsLoading,
  } = useQuery({ queryKey: ["products"], queryFn: fetchProducts, retry: false });

  const {
    data: categories,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useQuery({ queryKey: ["categories"], queryFn: fetchCategories, retry: false });

  useEffect(() => {
    if (categoriesError) {
      toast({ title: "Failed to load categories", description: formatError(categoriesError) });
    }
  }, [categoriesError]);

  const queryClient = useQueryClient();

  const [localCategories, setLocalCategories] = useState<any[] | null>(null);

  // Local form state for simple CRUD
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategorySlug, setNewCategorySlug] = useState("");

  const [newProductName, setNewProductName] = useState("");
  const [newProductSlug, setNewProductSlug] = useState("");
  const [newProductCategory, setNewProductCategory] = useState("");
  const [newProductDescription, setNewProductDescription] = useState("");
  const [newProductFiles, setNewProductFiles] = useState<File[]>([]);
  const [newProductImageUrls, setNewProductImageUrls] = useState<string[]>([]);
  const [imageUploading, setImageUploading] = useState(false);
  const [hasEditedSlug, setHasEditedSlug] = useState(false);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [signInLoading, setSignInLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const createCategoryMutation = useMutation({
    mutationFn: async (payload: { name: string; slug: string }) => {
      const { data, error } = await supabase.from("categories").insert([payload]).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      toast({ title: "Category created", description: "The category was added." });
    },
    onError: (err: any) => {
      toast({ title: "Error creating category", description: formatError(err) });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: async ({ id, payload }: { id: number; payload: any }) => {
      const { data, error } = await supabase.from("products").update(payload).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      setEditingId(null);
      setNewProductName("");
      setNewProductSlug("");
      setNewProductCategory("");
      setNewProductDescription("");
      setNewProductImageUrls([]);
      setNewProductFiles([]);
      setHasEditedSlug(false);
      toast({ title: "Product updated" });
    },
    onError: (err: any) => toast({ title: "Error updating product", description: formatError(err) }),
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase.from("categories").delete().eq("id", id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      toast({ title: "Category deleted" });
    },
    onError: (err: any) => toast({ title: "Error deleting category", description: formatError(err) }),
  });

  const createProductMutation = useMutation({
    mutationFn: async (payload: any) => {
      const { data, error } = await supabase.from("products").insert([payload]).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      setNewProductName("");
      setNewProductSlug("");
      setNewProductCategory("");
      setNewProductDescription("");
      setNewProductImageUrls([]);
      setNewProductFiles([]);
      setHasEditedSlug(false);
      toast({ title: "Product created" });
    },
    onError: (err: any) => toast({ title: "Error creating product", description: formatError(err) }),
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      toast({ title: "Product deleted" });
    },
    onError: (err: any) => toast({ title: "Error deleting product", description: formatError(err) }),
  });

  // Confirmation dialog state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmTarget, setConfirmTarget] = useState<{ type: "product" | "category"; id: number } | null>(null);

  const openDeleteConfirm = (type: "product" | "category", id: number) => {
    setConfirmTarget({ type, id });
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!confirmTarget) return;
    const { type, id } = confirmTarget;
    setConfirmOpen(false);
    setConfirmTarget(null);
    if (type === "product") deleteProductMutation.mutate(id);
    else deleteCategoryMutation.mutate(id);
  };

  const handleFilesSelected = (files: FileList | null) => {
    if (!files) return;
    const list = Array.from(files);
    // append to existing
    setNewProductFiles((cur) => [...cur, ...list]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFilesSelected(e.dataTransfer.files);
  };

  const handleUploadImages = async () => {
    if (newProductFiles.length === 0) return toast({ title: "No files selected" });
    setImageUploading(true);
    const storageBucket =
      (import.meta.env.VITE_SUPABASE_STORAGE_BUCKET as string | undefined) ??
      (import.meta.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET as string | undefined) ??
      "product-images";

    try {
      const uploadedUrls: string[] = [];
      for (const file of newProductFiles) {
        const filePath = `products/${Date.now()}_${file.name}`;
        const { error } = await supabase.storage.from(storageBucket).upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });
        if (error) throw error;
        const { data: urlData } = supabase.storage.from(storageBucket).getPublicUrl(filePath);
        const publicUrl = urlData?.publicUrl ?? null;
        if (publicUrl) uploadedUrls.push(publicUrl);
      }
      setNewProductImageUrls((cur) => [...cur, ...uploadedUrls]);
      // clear staged files
      setNewProductFiles([]);
      toast({ title: "Upload successful", description: `${uploadedUrls.length} image(s) uploaded.` });
    } catch (err: any) {
      toast({ title: "Upload failed", description: formatError(err) });
    } finally {
      setImageUploading(false);
    }
  };

  const removeUploadedPreview = (idx: number) => {
    setNewProductImageUrls((cur) => cur.filter((_, i) => i !== idx));
  };

  useEffect(() => {
    if (!newProductName.trim()) {
      if (!hasEditedSlug) setNewProductSlug("");
      return;
    }

    if (!hasEditedSlug) {
      setNewProductSlug(slugify(newProductName));
    }
  }, [hasEditedSlug, newProductName]);

  // Fallback: if react-query categories are empty, fetch directly and surface errors
  useEffect(() => {
    const tryFallback = async () => {
      if (categoriesLoading) return;
      if (categories && categories.length > 0) return;
      try {
        const { data, error } = await supabase.from("categories").select("id,name,slug").order("created_at", { ascending: false });
        if (error) {
          toast({ title: "Failed loading categories", description: formatError(error) });
          return;
        }
        if (data && data.length > 0) setLocalCategories(data);
      } catch (err: any) {
        toast({ title: "Failed loading categories", description: formatError(err) });
      }
    };
    tryFallback();
  }, [categories, categoriesLoading]);

  return (
    <>
      <PageHeader
        eyebrow="Admin Dashboard"
        title="Supabase Integration"
        subtitle="A lightweight admin entry point for your Supabase-backed site migration."
      />

      {!isLoading && !data?.session && (
        <section className="py-16 bg-background">
          <div className="container max-w-2xl">
            <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
              <h3 className="text-xl font-semibold">Admin sign in</h3>
              <p className="mt-2 text-muted-foreground">Sign in with your email and password to access the admin dashboard.</p>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!authEmail || !authPassword) return toast({ title: "Enter email and password" });
                  setSignInLoading(true);
                  try {
                    const { data: signData, error } = await supabase.auth.signInWithPassword({ email: authEmail, password: authPassword });
                    if (error) throw error;
                    toast({ title: "Signed in" });
                    queryClient.invalidateQueries(["supabase-session"]);
                  } catch (err: any) {
                    toast({ title: "Sign-in failed", description: formatError(err) });
                  } finally {
                    setSignInLoading(false);
                  }
                }}
                className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-4"
              >
                <input
                  className="input p-2 border col-span-1 sm:col-span-2"
                  placeholder="you@company.com"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                />
                <input
                  className="input p-2 border col-span-1 sm:col-span-2"
                  placeholder="Password"
                  type="password"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                />
                <div className="col-span-1 sm:col-span-4 flex gap-2">
                  <button type="submit" className="rounded bg-primary px-3 py-2 text-sm text-white">
                    {signInLoading ? "Signing in..." : "Sign in"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}

      {data?.session && (
      <section className="py-16 bg-background">
        <div className="container max-w-7xl">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <h2 className="text-2xl font-semibold">Connection status</h2>
            <p className="mt-3 text-muted-foreground">
              This page verifies that your app is configured to connect to Supabase from the browser.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-muted/70 p-4 border border-border">
                <div className="text-sm uppercase tracking-wide text-muted-foreground">Supabase URL</div>
                <div className="mt-2 font-medium break-all text-foreground">
                  {import.meta.env.VITE_SUPABASE_URL || "Not configured"}
                </div>
              </div>
              <div className="rounded-2xl bg-muted/70 p-4 border border-border">
                <div className="text-sm uppercase tracking-wide text-muted-foreground">Anon key</div>
                <div className="mt-2 font-medium text-foreground">
                  {import.meta.env.VITE_SUPABASE_ANON_KEY ? "Configured" : "Not configured"}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <h3 className="text-xl font-semibold">Supabase session</h3>
            {isLoading ? (
              <p className="mt-4 text-foreground/80">Checking connection...</p>
            ) : error ? (
              <div className="mt-4 rounded-2xl border border-red-300 bg-red-50 p-4 text-sm text-red-800">
                <p className="font-semibold">Unable to fetch Supabase session.</p>
                <p>{String(error)}</p>
              </div>
            ) : (
              <div className="mt-4 rounded-2xl border border-green-300 bg-green-50 p-4 text-sm text-green-900">
                <p className="font-semibold">Connected successfully.</p>
                <p>{data?.session ? "A user session exists." : "No active user session."}</p>
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <h3 className="text-xl font-semibold">Next step</h3>
            <p className="mt-4 text-muted-foreground">
              Create tables in Supabase for products, admin users, and dashboard data, then query them from this page.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <h3 className="text-xl font-semibold">Products</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const slug = newProductSlug.trim() || slugify(newProductName);
                createProductMutation.mutate({
                  name: newProductName.trim(),
                  slug,
                  category: newProductCategory || null,
                  description: newProductDescription || null,
                  image_url: newProductImageUrls[0] ?? null,
                });
              }}
              className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-4"
            >
              <input
                className="input p-2 border"
                placeholder="Name"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
              />
              <input
                className="input p-2 border"
                placeholder="Slug"
                value={newProductSlug}
                onChange={(e) => {
                  setNewProductSlug(e.target.value);
                  setHasEditedSlug(true);
                }}
              />
              <select
                className="p-2 border"
                value={newProductCategory}
                onChange={(e) => setNewProductCategory(e.target.value)}
              >
                <option value="">Unassigned</option>
                {(() => {
                  const effective = (categories && categories.length > 0) ? categories : (localCategories ?? []);
                  if (categoriesLoading) return <option disabled>Loading...</option>;
                  if (effective.length === 0) return <option disabled>No categories</option>;
                  return effective.map((c: any) => (
                    <option key={c.id} value={c.slug ?? c.name}>
                      {c.name}
                    </option>
                  ));
                })()}
              </select>
              <div className="col-span-1 sm:col-span-4">
                <textarea
                  className="input p-2 border w-full"
                  placeholder="Description"
                  value={newProductDescription}
                  onChange={(e) => setNewProductDescription(e.target.value)}
                />

                <div
                  className="mt-2 rounded border-dashed border-2 border-border p-4 text-center"
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleFilesSelected(e.target.files)}
                      className=""
                    />
                    <Button variant="outline" onClick={handleUploadImages} disabled={imageUploading || newProductFiles.length===0}>
                      {imageUploading ? "Uploading..." : `Upload ${newProductFiles.length || 0} image(s)`}
                    </Button>
                    <div className="ml-auto">
                      <Button type="submit">{createProductMutation.isLoading ? "Creating..." : "Submit / Add"}</Button>
                    </div>
                  </div>
                  {newProductFiles.length > 0 && (
                    <div className="mt-2 text-sm text-muted-foreground">Staged: {newProductFiles.map((f) => f.name).join(", ")}</div>
                  )}
                </div>

                {newProductImageUrls.length > 0 && (
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {newProductImageUrls.map((u, i) => (
                      <div key={u} className="relative">
                        <img src={u} alt={`preview-${i}`} className="h-28 w-full object-cover rounded" />
                        <button
                          className="absolute right-1 top-1 rounded bg-white/70 px-2 text-xs"
                          onClick={() => removeUploadedPreview(i)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </form>
            {productsLoading ? (
              <p className="mt-4 text-foreground/80">Loading products...</p>
            ) : productsError ? (
              <div className="mt-4 rounded-2xl border border-red-300 bg-red-50 p-4 text-sm text-red-800">
                <p className="font-semibold">Unable to fetch products.</p>
                <p>{String(productsError)}</p>
              </div>
            ) : (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="text-left text-sm text-muted-foreground">
                      <th className="px-2 py-2">ID</th>
                      <th className="px-2 py-2">Name</th>
                      <th className="px-2 py-2">Slug</th>
                      <th className="px-2 py-2">Category</th>
                      <th className="px-2 py-2">Actions</th>
                      <th className="px-2 py-2">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(products || []).map((p: any) => (
                      <tr key={p.id} className="border-t">
                        <td className="px-2 py-3 text-sm">{p.id}</td>
                        <td className="px-2 py-3 text-sm">{p.name}</td>
                        <td className="px-2 py-3 text-sm">{p.slug}</td>
                        <td className="px-2 py-3 text-sm">{p.category ?? "—"}</td>
                        <td className="px-2 py-3 text-sm">
                          <div className="flex gap-2">
                            <button
                              className="text-sm text-primary"
                              onClick={() => {
                                setEditingId(p.id);
                                setNewProductName(p.name ?? "");
                                setNewProductSlug(p.slug ?? "");
                                setNewProductCategory(p.category ?? "");
                                setNewProductDescription(p.description ?? "");
                                setNewProductImageUrls(p.image_url ? [p.image_url] : []);
                                setHasEditedSlug(true);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="text-sm text-red-600"
                              onClick={() => openDeleteConfirm("product", p.id)}
                              disabled={deleteProductMutation.isLoading}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                        <td className="px-2 py-3 text-sm">{p.created_at ?? "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <h3 className="text-xl font-semibold">Categories</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createCategoryMutation.mutate({ name: newCategoryName, slug: newCategorySlug });
                setNewCategoryName("");
                setNewCategorySlug("");
              }}
              className="mt-4 flex gap-2"
            >
              <input
                className="input p-2 border flex-1"
                placeholder="Category name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
              <input
                className="input p-2 border"
                placeholder="slug"
                value={newCategorySlug}
                onChange={(e) => setNewCategorySlug(e.target.value)}
              />
              <button type="submit" className="rounded bg-primary px-3 py-2 text-sm text-white">
                {createCategoryMutation.isLoading ? "Creating..." : "Create"}
              </button>
            </form>
            {categoriesLoading ? (
              <p className="mt-4 text-foreground/80">Loading categories...</p>
            ) : categoriesError ? (
              <div className="mt-4 rounded-2xl border border-red-300 bg-red-50 p-4 text-sm text-red-800">
                <p className="font-semibold">Unable to fetch categories.</p>
                <p>{String(categoriesError)}</p>
              </div>
            ) : (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="text-left text-sm text-muted-foreground">
                      <th className="px-2 py-2">ID</th>
                      <th className="px-2 py-2">Name</th>
                      <th className="px-2 py-2">Slug</th>
                      <th className="px-2 py-2">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(categories || []).map((c: any) => (
                      <tr key={c.id} className="border-t">
                        <td className="px-2 py-3 text-sm">{c.id}</td>
                        <td className="px-2 py-3 text-sm">{c.name}</td>
                        <td className="px-2 py-3 text-sm">{c.slug}</td>
                        <td className="px-2 py-3 text-sm">
                          <button
                            className="text-sm text-red-600"
                            onClick={() => openDeleteConfirm("category", c.id)}
                            disabled={deleteCategoryMutation.isLoading}
                          >
                            Delete
                          </button>
                        </td>
                        <td className="px-2 py-3 text-sm">{c.created_at ?? "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
            </div>

            <aside className="md:col-span-1 space-y-6">
              <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
                <h4 className="text-sm font-medium text-muted-foreground">Stats</h4>
                <div className="mt-4 grid gap-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">Products</div>
                    <div className="font-medium">{(products || []).length}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">Categories</div>
                    <div className="font-medium">{(categories || []).length}</div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
                <h4 className="text-sm font-medium text-muted-foreground">Quick actions</h4>
                <div className="mt-4 flex flex-col gap-2">
                  <Button variant="outline" onClick={() => window.location.reload()}>
                    Refresh
                  </Button>
                    <Button variant="ghost" onClick={() => toast({ title: "Tip", description: "Use the create forms to add rows." })}>
                      Help
                    </Button>
                    <Button variant="destructive" onClick={async () => {
                      try {
                        await supabase.auth.signOut();
                        queryClient.invalidateQueries(["supabase-session"]);
                        toast({ title: "Signed out" });
                        // optionally reload to show sign-in form
                        window.location.reload();
                      } catch (err: any) {
                        toast({ title: "Sign-out failed", description: formatError(err) });
                      }
                    }}>
                      Sign out
                    </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
      )}

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm delete</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground mt-2">This action cannot be undone. Are you sure?</p>
          <DialogFooter className="mt-4">
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setConfirmOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleConfirmDelete}>
                Delete
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Admin;
