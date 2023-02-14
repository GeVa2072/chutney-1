import { ThemeService } from '@core/theme/theme.service';


export function initializeThemeFactory(themeService: ThemeService): () => void {
    return () => themeService.applyCurrentTheme();
}
