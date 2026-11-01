import * as React from "react";
import { Platform, type View, type ViewStyle } from "react-native";
import { atom, getDefaultStore, useAtomValue } from "jotai";

const DEFAULT_PORTAL_HOST = "INTERNAL_PRIMITIVE_DEFAULT_HOST_NAME";

type PortalMap = Map<string, React.ReactNode>;
type PortalHostMap = Map<string, PortalMap>;

// App-level portal state lives in a Jotai atom (see AGENTS.md STATE MANAGEMENT).
const portalMapAtom = atom<PortalHostMap>(
  new Map<string, PortalMap>().set(
    DEFAULT_PORTAL_HOST,
    new Map<string, React.ReactNode>(),
  ),
);

const updatePortal = (
  hostName: string,
  name: string,
  children: React.ReactNode,
) => {
  const store = getDefaultStore();
  const prev = store.get(portalMapAtom);
  const next = new Map(prev);
  const portal = new Map(next.get(hostName) ?? new Map<string, React.ReactNode>());
  portal.set(name, children);
  next.set(hostName, portal);
  store.set(portalMapAtom, next);
};

const removePortal = (hostName: string, name: string) => {
  const store = getDefaultStore();
  const prev = store.get(portalMapAtom);
  const next = new Map(prev);
  const portal = new Map(next.get(hostName) ?? new Map<string, React.ReactNode>());
  portal.delete(name);
  next.set(hostName, portal);
  store.set(portalMapAtom, next);
};

export function PortalHost({ name = DEFAULT_PORTAL_HOST }: { name?: string }) {
  const portalHostMap = useAtomValue(portalMapAtom);
  const portalMap =
    portalHostMap.get(name) ??
    new Map<string, React.ReactNode>();
  if (portalMap.size === 0) return null;
  return <>{Array.from(portalMap.values())}</>;
}

export function Portal({
  name,
  hostName = DEFAULT_PORTAL_HOST,
  children,
}: {
  name: string;
  hostName?: string;
  children: React.ReactNode;
}) {
  React.useEffect(() => {
    updatePortal(hostName, name, children);
  }, [hostName, name, children]);

  React.useEffect(() => {
    return () => {
      removePortal(hostName, name);
    };
  }, [hostName, name]);

  return null;
}

const ROOT: ViewStyle = {
  flex: 1,
};

export function useModalPortalRoot() {
  const ref = React.useRef<View>(null);
  const [sideOffset, setSideOffSet] = React.useState(0);

  const onLayout = React.useCallback(() => {
    if (Platform.OS === "web") return;
    ref.current?.measure((_x, _y, _width, _height, _pageX, pageY) => {
      setSideOffSet(-pageY);
    });
  }, []);

  return {
    ref,
    sideOffset,
    onLayout,
    style: ROOT,
  };
}
