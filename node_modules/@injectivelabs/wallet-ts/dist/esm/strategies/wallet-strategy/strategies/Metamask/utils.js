import { isServerSide } from '@injectivelabs/sdk-ts';
const $window = (isServerSide()
    ? {}
    : window);
export async function getMetamaskProvider({ timeout } = { timeout: 3000 }) {
    const provider = getMetamaskFromWindow();
    if (provider) {
        return provider;
    }
    return listenForMetamaskInitialized({
        timeout,
    });
}
async function listenForMetamaskInitialized({ timeout } = { timeout: 3000 }) {
    return new Promise((resolve) => {
        const handleInitialization = () => {
            resolve(getMetamaskFromWindow());
        };
        $window.addEventListener('ethereum#initialized', handleInitialization, {
            once: true,
        });
        setTimeout(() => {
            $window.removeEventListener('ethereum#initialized', handleInitialization);
            resolve(null);
        }, timeout);
    });
}
function getMetamaskFromWindow() {
    const injectedProviderExist = typeof window !== 'undefined' && typeof $window.ethereum !== 'undefined';
    // No injected providers exist.
    if (!injectedProviderExist) {
        return;
    }
    if ($window.ethereum.isMetaMask) {
        return $window.ethereum;
    }
    if ($window.providers) {
        return $window.providers.find((p) => p.isMetaMask);
    }
    return;
}
//# sourceMappingURL=utils.js.map