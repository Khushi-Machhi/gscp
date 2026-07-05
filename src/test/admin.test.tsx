import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Admin from "../pages/Admin";
import { supabase } from "../lib/supabase";

vi.mock("../lib/supabase", () => ({
  supabase: {
    auth: {
      getSession: vi.fn(),
    },
    from: vi.fn(),
  },
}));

describe("Admin", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the Supabase status when session lookup succeeds", async () => {
    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: { user: { id: "1" } } },
      error: null,
    } as never);

    vi.mocked(supabase.from).mockImplementation((table: string) => {
      if (table === "products") {
        return {
          select: vi.fn().mockReturnThis(),
          order: vi.fn().mockResolvedValue({ data: [], error: null }),
        } as never;
      }

      if (table === "categories") {
        return {
          select: vi.fn().mockReturnThis(),
          order: vi.fn().mockResolvedValue({ data: [], error: null }),
        } as never;
      }

      return {} as never;
    });

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Admin />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText(/connection status/i)).toBeInTheDocument();
      expect(screen.getByText(/Connected successfully/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/A user session exists/i)).toBeInTheDocument();
  });

  it("submits a new product to Supabase with an auto-generated slug", async () => {
    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: { user: { id: "1" } } },
      error: null,
    } as never);

    const insertMock = vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        single: vi.fn().mockResolvedValue({
          data: { id: 1, name: "Test Product", slug: "test-product" },
          error: null,
        }),
      }),
    });

    vi.mocked(supabase.from).mockImplementation((table: string) => {
      if (table === "products") {
        return {
          select: vi.fn().mockReturnThis(),
          order: vi.fn().mockResolvedValue({ data: [], error: null }),
          insert: insertMock,
        } as never;
      }

      if (table === "categories") {
        return {
          select: vi.fn().mockReturnThis(),
          order: vi.fn().mockResolvedValue({ data: [], error: null }),
        } as never;
      }

      return {} as never;
    });

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Admin />
      </QueryClientProvider>,
    );

    await waitFor(() => expect(screen.getByPlaceholderText("Name")).toBeInTheDocument());

    fireEvent.change(screen.getByPlaceholderText("Name"), { target: { value: "Test Product" } });
    fireEvent.change(screen.getByPlaceholderText("Description"), { target: { value: "A great product" } });
    fireEvent.click(screen.getByRole("button", { name: /submit \/ add/i }));

    await waitFor(() => {
      expect(insertMock).toHaveBeenCalledWith([
        expect.objectContaining({
          name: "Test Product",
          slug: "test-product",
          description: "A great product",
          image_url: null,
        }),
      ]);
    });
  });
});
