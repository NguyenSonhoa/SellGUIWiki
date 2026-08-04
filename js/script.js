const VERSION = "3.1";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function icon(name, size = 18) {
  return `<i data-lucide="${name}" style="width:${size}px;height:${size}px"></i>`;
}

function codeBlock(label, code, lang = "text") {
  const id = `code-${Math.random().toString(36).slice(2)}`;
  return `
    <div class="code-block">
      <div class="code-head">
        <span>${escapeHtml(label)}</span>
        <button class="copy-btn" type="button" data-copy-target="${id}">${icon("copy", 14)} Copy</button>
      </div>
      <pre><code id="${id}" data-lang="${escapeHtml(lang)}">${escapeHtml(code.trim())}</code></pre>
    </div>
  `;
}

function table(headers, rows) {
  return `
    <div class="table-wrap">
      <table>
        <thead><tr>${headers.map((h) => `<th>${escapeHtml(h)}</th>`).join("")}</tr></thead>
        <tbody>
          ${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function callout(type, content) {
  return `<div class="callout ${type || ""}">${content}</div>`;
}

function pills(items, style = "") {
  return `<div class="pill-list">${items.map((item) => `<span class="pill ${style}">${item}</span>`).join("")}</div>`;
}

const snippets = {
  install: `
# Install
1. Put SellGUI-3.1.jar in plugins/
2. Install Vault, NBTAPI, and an economy provider
3. Restart the server
4. Edit plugins/SellGUI/
5. Run /sellgui reload
`,
  build: `
git clone https://github.com/NguyenSonhoa/SellGUI.git
cd SellGUI
git checkout v3.1
mvn -q -DskipTests package
`,
  layout: `
plugins/SellGUI/
  config.yml
  itemprices.yml
  mmoitems.yml
  nexo.yml
  customitems.yml
  custommenuitems.yml
  random-prices.yml
  messages.yml
  sounds.yml
  autosell_data.yml
  addons/
    SellGUI-DynaShop-3.1.jar
  gui/
    sell_menus/
      default.yml
      fishing.yml
    price_setter.yml
    price_evaluation.yml
    autosell_settings.yml
`,
  miningMenu: `
sell_menus:
  mining:
    name: "Mining"
    permission: "sellgui.menu.mining"
    title: "&8/sellgui > Mining"
    size: 36
    item-filter:
      allowed-items:
        - "IRON_INGOT"
        - "GOLD_INGOT"
        - "DIAMOND"
        - "EMERALD"
      denied-items: []
      exclusive: true
    positions:
      sell_button: [31]
      confirm_button: [31]
      filler_slots: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 17, 18, 26, 27, 28, 29, 30, 32, 33, 34, 35]
      item_slots: [10, 11, 12, 13, 14, 15, 16, 19, 20, 21, 22, 23, 24, 25]
    items:
      sell_button:
        material: "EMERALD"
        custom-model-data: 0
        name: "&a&lCalculate Mining Sale"
        lore:
          - "&7Only mining items can be sold here."
          - "&eTotal Value: &a$0.00"
        glow: true
      confirm_button:
        material: "GREEN_CONCRETE"
        custom-model-data: 0
        name: "&a&lConfirm Mining Sale"
        lore:
          - "&fTotal: &e$%total%"
        glow: true
      filler:
        material: "GRAY_STAINED_GLASS_PANE"
        custom-model-data: 0
        name: " "
        lore: []
      no_items:
        material: "BARRIER"
        custom-model-data: 0
        name: "&c&lNo Items To Sell"
        lore:
          - "&7Add mining items to this menu."
    item_total_format: "&7%amount%x &f%item% &8= &e$%total%"
    evaluation_required_format: "&7%amount%x &f%item% &cNeeds Evaluation"
`,
  customMenuItem: `
fishing-info:
  material: "COD"
  name: "&bFishing Sell Info"
  glimmer: false
  custom-model-data: 0
  item-model: "kostka:add10_button_model"
  hide-tool-tip: true
  tooltip-style: "minecraft:empty"
  slot: 35
  menus:
    - "fishing"
  disabled: false
  sender: "player" # console, player, or op
  close-menu: true # close SellGUI before command runs
  lore:
    - "&7This button only appears"
    - "&7in the fishing sell menu."
  commands: []
`,
  priceConfig: `
prices:
  nbt-pricing: true
  calculation-method: "auto" # auto, addon, config, essentials, nbt, shopguiplus
  default-price: 0.0
  multipliers:
    enabled: true
    permission-based: true
    default-multiplier: 1.0
    max-multiplier: 5.0
  random-pricing:
    enabled: false
    variation-percent: 10.0
`,
  mmo: `
mmoitems:
  SWORD:
    EXCALIBUR: 1000.0
    STEEL_SWORD: 250.0
  MATERIAL:
    MAGIC_DUST: 50.0
`,
  nexo: `
nexo:
  custom_sword: 500.0
  magic_wand: 300.0
  rare_helmet: 750.0
`,
  worthLore: `
general:
  add-worth-lore: true
  worth-lore-whitelist-gui: false
  worth-lore-whitelist-gui-titles:
    - "Shulker Box"
    - "Large Chest"
    - "<#FFFFFF>ABC"
    - "&#FFFFFFABC2"
    - "Chest"
    - "Inventory"
  worth-lore-blacklist-gui-titles:
    - "ah"
    - "Auction House"
    - "My Chest"
`,
  stacking: `
stacking:
  enabled: true
  normalize-on-join: true
  normalize-on-quit: true
  normalize-on-plugin-disable: true
  normalize-smelt-results: true
  normalize-after-furnace-extract: true
`,
  addonConfig: `
addons:
  enabled: true
  folder: "addons"

prices:
  calculation-method: "auto" # auto, addon, config, essentials, nbt, shopguiplus
`,
  dynashopInstall: `
plugins/
  SellGUI-3.1.jar
  ShopGUIPlus.jar
  ShopGUIPlus-DynaShop.jar
  Vault.jar
  NBTAPI.jar
  SellGUI/
    addons/
      SellGUI-DynaShop-3.1.jar
`,
  api: `
SellGUIMain plugin = JavaPlugin.getPlugin(SellGUIMain.class);
double price = plugin.getPriceManager().getItemPriceWithPlayer(itemStack, player);
plugin.getGUIManager().openPriceEvaluationGUI(player);

SellGUIAPI api = new SellGUIAPI(plugin);
double publicPrice = api.getPrice(itemStack, player);
api.openSellGUI(player);
`,
  priceProvider: `
public final class MyPriceProvider implements SellGUIPriceProvider {
    @Override
    public String getName() {
        return "MyProvider";
    }

    @Override
    public int getPriority() {
        return 50;
    }

    @Override
    public double getSellPrice(Player player, ItemStack itemStack) {
        return lookupDynamicSellPrice(player, itemStack);
    }
}

SellGUIMain sellGUI = SellGUIMain.getInstance();
sellGUI.getSellGUIAPI().registerPriceProvider(new MyPriceProvider());
`
};

const sections = [
  {
    id: "home",
    title: "Overview",
    icon: "book-open",
    desc: "SellGUI is a Minecraft selling plugin with configurable menus, price tools, autosell, sellall, evaluation, and custom item integrations.",
    keywords: "home overview sellgui wiki minecraft plugin",
    html: `
      <div class="content-grid">
        <div class="doc-card">
          <div class="stat-row">
            <div class="stat"><strong>${VERSION}</strong><span>Current version</span></div>
            <div class="stat"><strong>1.20.6+</strong><span>API target</span></div>
            <div class="stat"><strong>Multi-menu</strong><span>Sell menus folder</span></div>
            <div class="stat"><strong>Vault</strong><span>Economy bridge</span></div>
          </div>
          <h3 class="mt-6">What SellGUI does</h3>
          <p>SellGUI gives players a GUI-driven way to sell items and gives admins tight control over which items belong in each menu. Version 3.1 adds addon price providers, an <code>addons/</code> loader, and DynaShop support on top of the v3 menu and pricing pipeline.</p>
          ${pills(["/sellgui", "/sellall", "/autosell", "/sellguiprice", "Addons", "DynaShop", "ShopGUI+", "Essentials"], "good")}
        </div>
        <div class="doc-card half">
          <h3>Core workflow</h3>
          <ol>
            <li>Install SellGUI with Vault, NBTAPI, and an economy plugin.</li>
            <li>Configure prices in itemprices, mmoitems, nexo, Essentials, ShopGUI+, addon providers, or item NBT.</li>
            <li>Create sell menus under <code>gui/sell_menus/</code>.</li>
            <li>Use <code>allowed-items</code>, <code>denied-items</code>, and <code>exclusive</code> to control item routing.</li>
            <li>Let players sell through the GUI, <code>/sellall</code>, or autosell.</li>
          </ol>
        </div>
        <div class="doc-card half">
          <h3>Important design rule</h3>
          <p>Prices are item-based. Sell menus decide where an item may be sold. A fish can have one global price, while <code>fishing.yml</code> decides whether it is accepted only in the fishing menu.</p>
          ${callout("warn", "<strong>Menu-specific price overrides are not part of the current pricing model.</strong> Use separate item identifiers or future custom logic if a server needs different prices per menu.")}
          ${callout("", "<strong>3.1 note:</strong> SellGUI can now load addon jars from <code>plugins/SellGUI/addons/</code>. The bundled <code>SellGUI-DynaShop</code> addon connects ShopGUIPlus-DynaShop dynamic prices to <code>/sellgui</code> and <code>/sellall</code>.")}
        </div>
      </div>
    `
  },
  {
    id: "quick-start",
    title: "Quick Start",
    icon: "rocket",
    desc: "The shortest path from jar file to a working sell GUI.",
    keywords: "quick start install reload first setup",
    html: `
      <div class="content-grid">
        <div class="doc-card half">
          <h3>Install checklist</h3>
          <ol>
            <li>Install <code>Vault</code>, <code>NBTAPI</code>, and an economy provider such as EssentialsX or CMI.</li>
            <li>Put <code>SellGUI-3.1.jar</code> into the server <code>plugins/</code> folder.</li>
            <li>Restart the server to generate default files.</li>
            <li>Edit <code>plugins/SellGUI/config.yml</code> and files under <code>plugins/SellGUI/gui/</code>.</li>
            <li>Run <code>/sellgui reload</code>.</li>
          </ol>
          ${codeBlock("server setup", snippets.install)}
        </div>
        <div class="doc-card half">
          <h3>Build from source</h3>
          <p>The repository includes the ShopGUI+ API jar used by Maven, so a fresh clone can build immediately.</p>
          ${codeBlock("terminal", snippets.build, "bash")}
          <p>Output jar:</p>
          ${codeBlock("target", "target/SellGUI-3.1.jar")}
        </div>
      </div>
    `
  },
  {
    id: "requirements",
    title: "Requirements",
    icon: "server-cog",
    desc: "Required and optional dependencies.",
    keywords: "requirements vault economy nbtapi essentials shopguiplus mmoitems nexo packetevents",
    html: `
      <div class="content-grid">
        <div class="doc-card">
          <h3>Required</h3>
          ${table(["Component", "Notes"], [
            ["Java", "Use the Java version required by the server. Paper 26.3 requires Java 25."],
            ["Server", "One SellGUI jar supports Paper <code>1.21.x</code> through <code>26.3</code>."],
            ["Vault", "Required economy bridge."],
            ["Economy plugin", "EssentialsX, CMI, or any Vault-compatible economy plugin."],
            ["NBTAPI", "Declared as a required dependency in <code>plugin.yml</code>."]
          ])}
        </div>
        <div class="doc-card">
          <h3>Optional integrations</h3>
          ${table(["Plugin", "Purpose"], [
            ["EssentialsX", "Read Essentials worth prices."],
            ["ShopGUIPlus", "Read ShopGUI+ sell prices."],
            ["ShopGUIPlus-DynaShop", "Optional dependency for the SellGUI-DynaShop addon and dynamic market prices."],
            ["MMOItems", "Detect and price MMOItems using <code>MMOITEMS:TYPE.ID</code> identifiers."],
            ["Nexo", "Detect and price Nexo items using <code>NEXO:ITEM_ID</code> identifiers."],
            ["MythicLib", "Extra metadata/NBT support for item handling."],
            ["PlaceholderAPI", "Registers and processes SellGUI placeholders."],
            ["PacketEvents", "Displays packet-only item worth lore when enabled."]
          ])}
        </div>
      </div>
    `
  },
  {
    id: "commands",
    title: "Commands",
    icon: "terminal",
    desc: "Every public command and what it is for.",
    keywords: "commands sellgui autosell sellall sellguiprice setprice setrange reload evaluate",
    html: `
      <div class="doc-card">
        <h3>Command list</h3>
        <p>Aliases for <code>/sellgui</code>: <code>/sg</code>, <code>/sell</code>.</p>
        ${table(["Command", "Description", "Permission"], [
          ["<code>/sellgui</code>", "Open the default sell menu.", "<code>sellgui.use</code>"],
          ["<code>/sellgui &lt;menu&gt;</code>", "Open a specific sell menu, such as <code>/sellgui fishing</code>.", "<code>sellgui.use</code> plus menu permission"],
          ["<code>/sellgui &lt;player&gt;</code>", "Open the default menu for another player.", "<code>sellgui.others</code>"],
          ["<code>/sellgui &lt;player&gt; &lt;menu&gt;</code>", "Open a specific menu for another player.", "<code>sellgui.others</code>"],
          ["<code>/sellgui help</code>", "Show in-game help.", "<code>sellgui.use</code>"],
          ["<code>/sellgui reload</code>", "Reload configs and GUI files.", "<code>sellgui.reload</code>"],
          ["<code>/sellgui evaluate</code>", "Open the Price Evaluation GUI.", "<code>sellgui.evaluate</code>"],
          ["<code>/sellgui autosell</code>", "Open Autosell Settings.", "<code>sellgui.autosell</code>"],
          ["<code>/autosell</code>", "Open Autosell Settings.", "<code>sellgui.autosell</code>"],
          ["<code>/sellgui setprice &lt;amount&gt;</code>", "Set a fixed price for the item in hand.", "<code>sellgui.setprice</code>"],
          ["<code>/sellgui setrange &lt;min&gt; &lt;max&gt;</code>", "Set a random price range for the item in hand.", "<code>sellgui.setrange</code>"],
          ["<code>/sellguiprice</code>", "Open the Price Setter GUI.", "<code>sellgui.setprice</code>"],
          ["<code>/sellguiprice &lt;price&gt;</code>", "Set the price for the item in the open Price Setter GUI.", "<code>sellgui.setprice</code>"],
          ["<code>/sellall</code>", "Preview selling all valid inventory items.", "<code>sellgui.sellall</code>"],
          ["<code>/sellall confirm</code>", "Confirm the sellall preview.", "<code>sellgui.sellall</code>"]
        ])}
      </div>
    `
  },
  {
    id: "permissions",
    title: "Permissions",
    icon: "shield-check",
    desc: "Permission nodes, defaults, and menu-specific access.",
    keywords: "permissions sellgui menu multiplier bonus use admin",
    html: `
      <div class="doc-card">
        <h3>Permission nodes</h3>
        ${table(["Permission", "Default", "Description"], [
          ["<code>sellgui.*</code>", "plugin manager / op", "Access to all declared SellGUI features."],
          ["<code>sellgui.use</code>", "true", "Use the basic SellGUI command."],
          ["<code>sellgui.admin</code>", "op", "General admin permission."],
          ["<code>sellgui.others</code>", "manual grant", "Open SellGUI for another player."],
          ["<code>sellgui.reload</code>", "op", "Reload SellGUI."],
          ["<code>sellgui.bypass</code>", "op", "Bypass selected restrictions."],
          ["<code>sellgui.setprice</code>", "op", "Use price setter commands and GUI."],
          ["<code>sellgui.setrange</code>", "op", "Set random price ranges."],
          ["<code>sellgui.evaluate</code>", "op", "Use the Price Evaluation GUI."],
          ["<code>sellgui.sellall</code>", "true", "Use <code>/sellall</code>."],
          ["<code>sellgui.autosell</code>", "true", "Open autosell settings."],
          ["<code>sellgui.menu.*</code>", "true", "Access all configured menu permissions declared in plugin.yml."],
          ["<code>sellgui.menu.default</code>", "true", "Open the default menu."],
          ["<code>sellgui.menu.fishing</code>", "true", "Open the fishing menu."],
          ["<code>sellgui.bonus.*</code>", "false", "Wildcard node for permission-based bonuses."],
          ["<code>sellgui.bonus.&lt;number&gt;</code>", "false", "Adds a percentage-style sell bonus in GUI sale flow."],
          ["<code>sellgui.multiplier.*</code>", "false", "Wildcard node for permission-based multipliers."],
          ["<code>sellgui.multiplier.&lt;number&gt;</code>", "false", "Multiplies prices when permission-based multipliers are enabled."],
          ["<code>sellgui.vip</code>", "false", "Predeclared VIP rank permission."],
          ["<code>sellgui.premium</code>", "false", "Predeclared Premium rank permission."],
          ["<code>sellgui.elite</code>", "false", "Predeclared Elite rank permission."]
        ])}
        ${callout("warn", "When adding a new menu, define a permission in that menu file, for example <code>sellgui.menu.mining</code>, then grant it to the ranks that should open it.")}
      </div>
    `
  },
  {
    id: "configuration",
    title: "Configuration",
    icon: "settings",
    desc: "Generated files and main config sections.",
    keywords: "configuration config.yml files folder gui messages sounds itemprices random prices",
    html: `
      <div class="content-grid">
        <div class="doc-card">
          <h3>Generated layout</h3>
          <p>Version 3 removed the old root <code>gui.yml</code>. GUI layouts now live inside the <code>gui/</code> folder and are merged at runtime.</p>
          ${codeBlock("plugins/SellGUI", snippets.layout)}
        </div>
        <div class="doc-card half">
          <h3>Main config areas</h3>
          <ul>
            <li><code>general</code>: debug, update check, worth lore, close behavior.</li>
            <li><code>economy</code>: Vault, money formatting, transaction limits, tax, sell bonuses.</li>
            <li><code>prices</code>: calculation method, NBT pricing, multipliers, random variation.</li>
            <li><code>autosell</code>: autosell display settings.</li>
            <li><code>stacking</code>: normalize inventory and smelt-result behavior.</li>
            <li><code>performance</code>: cache duration, async calculations, GUI update interval.</li>
          </ul>
        </div>
        <div class="doc-card half">
          <h3>Reload behavior</h3>
          <p><code>/sellgui reload</code> reloads core configs, GUI YAML files, MMOItems/Nexo prices, random prices, and GUI managers.</p>
          ${callout("", "When editing individual files in <code>plugins/SellGUI/gui/</code>, keep valid YAML indentation. SellGUI merges all <code>.yml</code> and <code>.yaml</code> files recursively.")}
        </div>
      </div>
    `
  },
  {
    id: "sell-menus",
    title: "Sell Menus",
    icon: "layout-grid",
    desc: "Create separate GUI files and control which items are accepted.",
    keywords: "sell menus gui sell_menus fishing default forge allowed-items denied-items exclusive",
    html: `
      <div class="content-grid">
        <div class="doc-card">
          <h3>One menu per file</h3>
          <p>Recommended structure:</p>
          ${codeBlock("menu files", "plugins/SellGUI/gui/sell_menus/default.yml\nplugins/SellGUI/gui/sell_menus/fishing.yml\nplugins/SellGUI/gui/sell_menus/mining.yml")}
          ${codeBlock("example mining.yml", snippets.miningMenu, "yaml")}
        </div>
        <div class="doc-card half">
          <h3>Item filters</h3>
          ${table(["Key", "Behavior"], [
            ["<code>allowed-items</code>", "Empty accepts any valid item except denied items and items locked to another exclusive menu. Populated means only listed items are accepted."],
            ["<code>denied-items</code>", "Blocks listed items in this menu."],
            ["<code>exclusive</code>", "If true, listed allowed items are locked to this menu and skipped elsewhere."]
          ])}
        </div>
        <div class="doc-card half">
          <h3>Identifier formats</h3>
          ${table(["Item type", "Format"], [
            ["Vanilla", "<code>VANILLA:MATERIAL</code> or just <code>MATERIAL</code>"],
            ["MMOItems", "<code>MMOITEMS:TYPE.ID</code>"],
            ["Nexo", "<code>NEXO:ITEM_ID</code>"]
          ])}
          ${callout("", "Example: a fishing menu can allow <code>COD</code>, <code>SALMON</code>, <code>TROPICAL_FISH</code>, and <code>PUFFERFISH</code> with <code>exclusive: true</code>.")}
        </div>
      </div>
    `
  },
  {
    id: "pricing",
    title: "Pricing",
    icon: "badge-dollar-sign",
    desc: "Understand how SellGUI decides item value.",
    keywords: "pricing itemprices mmoitems nexo essentials shopguiplus nbt random price manager calculation",
    html: `
      <div class="content-grid">
        <div class="doc-card">
          <h3>Pricing sources</h3>
          <p>SellGUI can price vanilla items, custom item stacks, MMOItems, Nexo items, NBT/PDC-priced items, Essentials worth, ShopGUI+ prices, addon provider prices, and random/evaluated prices.</p>
          ${codeBlock("prices section", snippets.priceConfig, "yaml")}
        </div>
        <div class="doc-card half">
          <h3>Calculation method</h3>
          ${table(["Value", "Meaning"], [
            ["<code>auto</code>", "Use the best available price source. Addon providers are checked before built-in fallbacks."],
            ["<code>addon</code>", "Use registered addon price providers only. Aliases: <code>addons</code>, <code>external</code>."],
            ["<code>config</code>", "Use SellGUI config prices only."],
            ["<code>essentials</code>", "Use Essentials worth only."],
            ["<code>nbt</code>", "Use NBT price only."],
            ["<code>shopguiplus</code>", "Use ShopGUI+ only."]
          ])}
        </div>
        <div class="doc-card half">
          <h3>Where prices are stored</h3>
          <ul>
            <li><code>itemprices.yml</code>: vanilla material prices.</li>
            <li><code>customitems.yml</code>: saved custom ItemStacks with display name/lore/model data.</li>
            <li><code>mmoitems.yml</code>: MMOItems type and ID prices.</li>
            <li><code>nexo.yml</code>: Nexo item ID prices.</li>
            <li><code>random-prices.yml</code>: evaluation ranges.</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    id: "price-setter",
    title: "Price Setter",
    icon: "pen-line",
    desc: "Set fixed prices from GUI or command.",
    keywords: "price setter sellguiprice setprice fixed price customitems itemprices",
    html: `
      <div class="content-grid">
        <div class="doc-card half">
          <h3>Usage</h3>
          <ol>
            <li>Run <code>/sellguiprice</code>.</li>
            <li>Place an item in the center slot.</li>
            <li>Run <code>/sellguiprice &lt;price&gt;</code> while the GUI is open.</li>
            <li>Click save to persist it.</li>
          </ol>
          ${codeBlock("examples", "/sellguiprice 10.50\n/sellguiprice 100\n/sellguiprice 0")}
        </div>
        <div class="doc-card half">
          <h3>Direct command</h3>
          <p>Admins can set the price of the item in hand:</p>
          ${codeBlock("fixed price", "/sellgui setprice 10\n/sellgui setprice 0")}
          ${callout("warn", "Price setting is global per item identifier. The sell menu filter decides where the item may be sold.")}
        </div>
        <div class="doc-card half">
          <h3>MMOItems prices</h3>
          ${codeBlock("mmoitems.yml", snippets.mmo, "yaml")}
        </div>
        <div class="doc-card half">
          <h3>Nexo prices</h3>
          ${codeBlock("nexo.yml", snippets.nexo, "yaml")}
        </div>
      </div>
    `
  },
  {
    id: "evaluation",
    title: "Price Evaluation",
    icon: "wand-sparkles",
    desc: "Evaluate random-price items and preserve their evaluated price.",
    keywords: "evaluation random price current_price evaluated lore setrange random-prices",
    html: `
      <div class="content-grid">
        <div class="doc-card half">
          <h3>Open evaluation</h3>
          ${codeBlock("commands", "/sellgui evaluate\n/sellgui setrange 10 100")}
          <p>Use evaluation when an item must get a final price before sale. The final price is stored on the item as <code>current_price</code> and marked as <code>evaluated</code>.</p>
        </div>
        <div class="doc-card half">
          <h3>Important config</h3>
          ${codeBlock("price_evaluation.yml", 'price_evaluation_gui:\n  evaluation_lore_format: "&aEvaluated: &f$%price%"\n  random_calculation:\n    jackpot_chance: 20.0\n    distribution: "weighted"')}
          ${callout("", "As of 3.0.1, stacking normalization preserves evaluated lore and <code>current_price</code>.")}
        </div>
      </div>
    `
  },
  {
    id: "autosell-sellall",
    title: "Autosell & SellAll",
    icon: "repeat-2",
    desc: "Automatic and inventory-wide selling.",
    keywords: "autosell sellall confirm exclusive enchanted preview",
    html: `
      <div class="content-grid">
        <div class="doc-card half">
          <h3>Autosell</h3>
          ${codeBlock("open", "/autosell\n/sellgui autosell")}
          <p>Autosell lets players toggle automatic selling for priced items. Toggle data is stored in <code>autosell_data.yml</code>.</p>
          <p>Autosell skips items that belong to exclusive menus so category-specific items are not sold accidentally.</p>
        </div>
        <div class="doc-card half">
          <h3>SellAll</h3>
          ${codeBlock("sellall", "/sellall\n/sellall confirm")}
          <p><code>/sellall</code> calculates a preview first, then the player confirms.</p>
          <ul>
            <li>Skips unpriced items.</li>
            <li>Skips enchanted items when <code>sell-all-command-sell-enchanted: false</code>.</li>
            <li>Skips unevaluated random-price items.</li>
            <li>Skips items locked to exclusive sell menus.</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    id: "custom-menu-items",
    title: "Custom Menu Items",
    icon: "mouse-pointer-click",
    desc: "Add decorative/action buttons to sell menus.",
    keywords: "custommenuitems custom menu items commands menus slot button item-model tooltip tooltip-style hide-tool-tip",
    html: `
      <div class="doc-card">
        <h3>What this file is for</h3>
        <p><code>custommenuitems.yml</code> is an overlay for buttons or decorative items. It is not a price file and it is not a sell menu layout file.</p>
        ${codeBlock("custommenuitems.yml", snippets.customMenuItem, "yaml")}
        ${table(["Key", "Purpose"], [
          ["<code>slot</code>", "Zero-based inventory slot where the item appears. A 54-slot menu uses <code>0</code> through <code>53</code>."],
          ["<code>menus</code>", "Optional list of sell menu IDs where the button appears. Empty or omitted means every sell menu."],
          ["<code>item-model</code>", "Optional namespaced item model, for example <code>kostka:add10_button_model</code>."],
          ["<code>hide-tool-tip</code>", "Optional boolean to hide the vanilla tooltip on supported servers."],
          ["<code>tooltip-style</code>", "Optional namespaced tooltip style, for example <code>minecraft:empty</code>."],
           ["<code>disabled</code>", "If true, the button is replaced by the menu filler item."],
           ["<code>sender</code>", "Command sender: <code>console</code> (default), <code>player</code>, or <code>op</code>. The <code>op</code> mode temporarily grants OP only while dispatching the command."],
           ["<code>close-menu</code>", "When true, closes SellGUI then runs commands one tick later. Use this for commands that open their own GUI, such as MyCommand menus."],
           ["<code>commands</code>", "Commands run when clicked. Supports <code>%player%</code>; a leading <code>/</code> is optional."]
        ])}
      </div>
    `
  },
  {
    id: "integrations",
    title: "Integrations",
    icon: "plug",
    desc: "How external plugins fit into SellGUI.",
    keywords: "integrations essentials shopguiplus dynashop mmoitems nexo mythiclib placeholderapi packetevents vault nbtapi",
    html: `
      <div class="content-grid">
        <div class="doc-card half">
          <h3>Economy and prices</h3>
          <ul>
            <li><code>Vault</code> deposits player earnings.</li>
            <li><code>EssentialsX</code> can provide worth prices.</li>
            <li><code>ShopGUIPlus</code> can provide sell prices.</li>
            <li><code>ShopGUIPlus-DynaShop</code> can provide dynamic market sell prices through the SellGUI-DynaShop addon.</li>
            <li><code>DynamicShop</code> can provide dynamic sell prices through the SellGUI-DynamicShop addon.</li>
          </ul>
        </div>
        <div class="doc-card half">
          <h3>Custom item plugins</h3>
          <ul>
            <li><code>MMOItems</code>: identifiers use <code>MMOITEMS:TYPE.ID</code>.</li>
            <li><code>Nexo</code>: identifiers use <code>NEXO:ITEM_ID</code>.</li>
            <li><code>MythicLib</code>: used when present for metadata support.</li>
          </ul>
        </div>
        <div class="doc-card">
          <h3>Nexo quick reference</h3>
          <p>Nexo prices are stored under <code>nexo:</code> in <code>nexo.yml</code>. Nexo item IDs should match the Nexo item ID.</p>
          ${codeBlock("nexo.yml", snippets.nexo, "yaml")}
        </div>
      </div>
    `
  },
  {
    id: "addons",
    title: "Addons",
    icon: "puzzle",
    desc: "Load SellGUI addon jars and use external price providers.",
     keywords: "addons addon dynashop dynamicshop sellgui-dynashop sellgui-dynamicshop external price provider shopguiplus dynamic prices market",
    html: `
      <div class="content-grid">
        <div class="doc-card">
          <h3>Addon folder</h3>
          <p>Since <code>3.1</code>, SellGUI can load addon plugin jars from its own data folder. Put addon jars in <code>plugins/SellGUI/addons/</code> and restart the server.</p>
          ${codeBlock("folder layout", snippets.dynashopInstall)}
          ${callout("", "If an addon is already loaded directly from <code>plugins/</code>, SellGUI skips the duplicate jar in <code>addons/</code>.")}
        </div>
        <div class="doc-card half">
          <h3>Addon config</h3>
          ${codeBlock("config.yml", snippets.addonConfig, "yaml")}
          <p>Use <code>auto</code> for normal fallback behavior. Use <code>addon</code> when the server should sell only through registered addon providers.</p>
        </div>
        <div class="doc-card half">
          <h3>SellGUI-DynaShop</h3>
          <ul>
            <li>Requires <code>SellGUI</code>, <code>ShopGUIPlus</code>, and <code>ShopGUIPlus-DynaShop</code>.</li>
            <li>Reads ShopGUIPlus-DynaShop dynamic sell prices for <code>/sellgui</code> and <code>/sellall</code>.</li>
            <li>Supports progressive pricing by using DynaShop's average price for the stack amount.</li>
            <li>Notifies DynaShop after a sale so market price and stock can update.</li>
          </ul>
        </div>
        <div class="doc-card">
          <h3>Install DynaShop addon</h3>
          <ol>
            <li>Install <code>SellGUI-3.1.jar</code> in <code>plugins/</code>.</li>
            <li>Install <code>ShopGUIPlus</code> and <code>ShopGUIPlus-DynaShop</code> in <code>plugins/</code>.</li>
            <li>Put <code>SellGUI-DynaShop-3.1.jar</code> in <code>plugins/SellGUI/addons/</code>.</li>
            <li>Restart the server.</li>
            <li>Keep <code>prices.calculation-method: "auto"</code> or set it to <code>"addon"</code> for addon-only pricing.</li>
          </ol>
        </div>
        <div class="doc-card">
          <h3>Install DynamicShop addon</h3>
          <ol>
            <li>Install <code>SellGUI-3.1.7.jar</code> and <code>DynamicShop</code> in <code>plugins/</code>.</li>
            <li>Put <code>SellGUI-DynamicShop-3.1.7.jar</code> in <code>plugins/SellGUI/addons/</code>.</li>
            <li>Restart the server.</li>
            <li>Use <code>prices.calculation-method: "auto"</code> or <code>"addon"</code>.</li>
          </ol>
          <p>Supports regular DynamicShop material items and configured item templates. Stored-item variants and multi-currency payouts are not supported.</p>
        </div>
      </div>
    `
  },
  {
    id: "worth-lore",
    title: "Worth Lore",
    icon: "file-text",
    desc: "Packet-only item worth display through PacketEvents.",
    keywords: "worth lore packetevents whitelist blacklist gui title",
    html: `
      <div class="content-grid">
        <div class="doc-card">
          <h3>Enable worth lore</h3>
          <p>PacketEvents is required. Worth lore is displayed through packets so the real item is not constantly rewritten.</p>
          ${callout("", "<strong>3.0.3:</strong> worth lore now updates only the packet lore component instead of rebuilding Bukkit item meta, which helps preserve Nexo custom attribute displays.")}
          ${callout("", "<strong>3.0.5:</strong> packet worth lore now respects <code>prices.calculation-method</code>, avoids extra Essentials or ShopGUI+ fallback drift in config-only setups, and forces the added lore line to render non-italic.")}
          ${codeBlock("config.yml", snippets.worthLore, "yaml")}
        </div>
        <div class="doc-card half">
          <h3>Blacklist mode</h3>
          <p>Default behavior. Set <code>worth-lore-whitelist-gui: false</code>. Worth lore appears everywhere except GUI titles in <code>worth-lore-blacklist-gui-titles</code>.</p>
        </div>
        <div class="doc-card half">
          <h3>Whitelist mode</h3>
          <p>Set <code>worth-lore-whitelist-gui: true</code>. Worth lore appears only in titles listed in <code>worth-lore-whitelist-gui-titles</code>.</p>
          ${callout("", "Title matching normalizes plain titles, legacy hex colors such as <code>&#FFFFFFABC2</code>, and MiniMessage-style tags such as <code>&lt;#FFFFFF&gt;ABC</code>.")}
        </div>
      </div>
    `
  },
  {
    id: "placeholders",
    title: "Placeholders",
    icon: "braces",
    desc: "PlaceholderAPI and built-in placeholder fallback.",
    keywords: "placeholderapi placeholders sellgui pricehand player balance",
    html: `
      <div class="doc-card">
        <h3>PlaceholderAPI expansion</h3>
        <p>When PlaceholderAPI is installed, SellGUI registers the <code>sellgui</code> identifier.</p>
        ${table(["Placeholder", "Description"], [
          ["<code>%sellgui_pricehand%</code>", "Price of the item in the player's main hand."],
          ["<code>%sellgui_pricehandfull%</code>", "Item name and price of the item in hand."]
        ])}
        <h3>Built-in placeholders</h3>
        ${table(["Placeholder", "Description"], [
          ["<code>%player%</code>", "Player name."],
          ["<code>%player_name%</code>", "Player name."],
          ["<code>%player_displayname%</code>", "Player display name."],
          ["<code>%player_uuid%</code>", "Player UUID."],
          ["<code>%player_world%</code>", "Player world name."],
          ["<code>%vault_eco_balance%</code>", "Player Vault balance."],
          ["<code>%player_balance%</code>", "Player Vault balance."],
          ["<code>%server_online%</code>", "Online player count."],
          ["<code>%sellgui_version%</code>", "Plugin version."],
          ["<code>%time%</code>, <code>%date%</code>, <code>%timestamp%</code>", "Server local time values."]
        ])}
      </div>
    `
  },
  {
    id: "stacking",
    title: "Stacking",
    icon: "layers-3",
    desc: "How SellGUI normalizes item stacks safely.",
    keywords: "stacking normalize current_price evaluated lore smelt join quit",
    html: `
      <div class="content-grid">
        <div class="doc-card">
          <h3>Stacking config</h3>
          ${codeBlock("config.yml", snippets.stacking, "yaml")}
        </div>
        <div class="doc-card half">
          <h3>What normalization does</h3>
          <ul>
            <li>Runs after join, quit, plugin disable, smelting, and furnace extraction when enabled.</li>
            <li>Merges similar stacks in player storage inventory.</li>
            <li>Preserves custom plugin metadata.</li>
            <li>As of <code>3.0.4</code>, skips Nexo items entirely to avoid rewriting Nexo custom metadata during normalization.</li>
          </ul>
        </div>
        <div class="doc-card half">
          <h3>3.0.1 evaluated item fix</h3>
          <p>Evaluated items keep their <code>current_price</code>, <code>evaluated</code> marker, and configured evaluation lore. If old items only have evaluated lore, normalization can restore <code>current_price</code> from that lore.</p>
        </div>
      </div>
    `
  },
  {
    id: "api",
    title: "Developer API",
    icon: "code-2",
    desc: "Useful classes and common extension points.",
    keywords: "developer api SellGUIMain PriceManager GUIManager ItemIdentifier SellGUIPriceProvider addon provider",
    html: `
      <div class="content-grid">
        <div class="doc-card half">
          <h3>Useful entry points</h3>
          <ul>
            <li><code>SellGUIAPI</code>: public API for item price lookup and opening the default sell GUI.</li>
            <li><code>JavaPlugin.getPlugin(SellGUIMain.class)</code>: access the plugin from another Bukkit plugin.</li>
            <li><code>getPriceManager()</code>: price lookup and price saving.</li>
            <li><code>getGUIManager()</code>: open price/evaluation/autosell GUIs.</li>
            <li><code>ItemIdentifier</code>: identify vanilla, MMOItems, and Nexo items.</li>
            <li><code>SellGUIPriceProvider</code>: register external price providers for addon plugins.</li>
          </ul>
        </div>
        <div class="doc-card half">
          <h3>Example</h3>
          ${codeBlock("Java", snippets.api, "java")}
        </div>
        <div class="doc-card">
          <h3>Price provider addon</h3>
          <p>Addon plugins can register a provider with <code>SellGUIAPI</code>. SellGUI checks providers by priority and uses the first positive price returned.</p>
          ${codeBlock("Java", snippets.priceProvider, "java")}
          ${callout("", "Use <code>onItemsSold</code> in a provider when the external economy or market must update after SellGUI completes a sale.")}
        </div>
      </div>
    `
  },
  {
    id: "migration",
    title: "Migration",
    icon: "route",
    desc: "Upgrade from older versions to v3.",
    keywords: "migration upgrade gui.yml v3 sell_menus",
    html: `
      <div class="doc-card">
        <h3>From pre-v3 builds</h3>
        <ol>
          <li>Back up <code>plugins/SellGUI/</code>.</li>
          <li>Stop the server.</li>
          <li>Install the v3 jar.</li>
          <li>Start once to generate the new <code>gui/</code> folder.</li>
          <li>Move old GUI layout/menu settings from <code>gui.yml</code> into files under <code>gui/</code>.</li>
          <li>Put each sell menu in its own file under <code>gui/sell_menus/&lt;menu&gt;.yml</code>.</li>
          <li>Run <code>/sellgui reload</code>.</li>
        </ol>
        ${table(["Old", "New"], [
          ["Root <code>gui.yml</code>", "<code>gui/</code> folder"],
          ["One sell GUI", "Multiple sell menus under <code>gui/sell_menus/</code>"],
          ["Items sold anywhere", "Items can be locked to one menu with <code>exclusive: true</code>"]
        ])}
      </div>
    `
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    icon: "circle-help",
    desc: "Common problems and fixes.",
    keywords: "troubleshooting errors permission sellall price maven shopgui cannot sell",
    html: `
      <div class="content-grid">
        <div class="doc-card half">
          <h3>No permission for menu</h3>
          <p>If <code>/sellgui fishing</code> fails, grant:</p>
          ${codeBlock("permission", "sellgui.menu.fishing")}
        </div>
        <div class="doc-card half">
          <h3>Item cannot sell in default menu</h3>
          <p>Check if the item belongs to another menu with <code>exclusive: true</code>. Fish in <code>fishing.yml</code> are a common example.</p>
        </div>
        <div class="doc-card half">
          <h3>/sellall skips items</h3>
          <ul>
            <li>No price exists.</li>
            <li>Item is enchanted and enchanted sellall is disabled.</li>
            <li>Item requires evaluation.</li>
            <li>Item is locked to an exclusive menu.</li>
          </ul>
        </div>
        <div class="doc-card half">
          <h3>Maven build fails</h3>
          <p>Make sure this file exists:</p>
          ${codeBlock("required local jar", "libs/shopgui-api-3.1.0.jar\nmvn -q -DskipTests package")}
        </div>
        <div class="doc-card half">
          <h3>Addon jar does not load</h3>
          <ul>
            <li>Check that the jar is inside <code>plugins/SellGUI/addons/</code>.</li>
            <li>Check <code>addons.enabled: true</code> in <code>config.yml</code>.</li>
            <li>Install any dependencies declared by the addon. For <code>SellGUI-DynaShop</code>, install <code>ShopGUIPlus</code> and <code>ShopGUIPlus-DynaShop</code>.</li>
            <li>Restart the server after adding or replacing addon jars.</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    id: "changelog",
    title: "Changelog",
    icon: "history",
    desc: "Recent release notes.",
    keywords: "changelog versions release 3.1.8 3.1.7 3.1.6 3.1.5 3.1.4 3.1.3 3.1.2 3.1 3.0.5 3.0.4 3.0.3 3.0.2 3.0.1 3.0.0",
    html: `
      <div class="doc-card">
        <h3>Release history</h3>
        <div class="timeline">
          <div class="release">
            <div class="release-header"><span class="release-title">3.1.8</span><span class="release-date">2026-08-05</span></div>
            <ul>
              <li>Added <code>close-menu: true</code> for custom menu items. SellGUI closes before player commands run, allowing commands to open their own inventory GUI.</li>
              <li>Set a Paper <code>1.21.x</code> API baseline for one Java 17 bytecode jar targeting Paper through <code>26.3</code>.</li>
              <li>Released <code>SellGUI-3.1.8.jar</code>, <code>SellGUI-DynamicShop-3.1.8.jar</code>, and <code>SellGUI-DynaShop-3.1.8.jar</code>.</li>
            </ul>
          </div>
          <div class="release">
            <div class="release-header"><span class="release-title">3.1.7</span><span class="release-date">2026-07-12</span></div>
            <ul>
              <li>Added <code>sender: console|player|op</code> for custom menu item commands.</li>
              <li>Added the <code>SellGUI-DynamicShop</code> addon for DynamicShop sell prices, stock updates, and transaction logging.</li>
              <li>Released <code>SellGUI-3.1.7.jar</code>, <code>SellGUI-DynamicShop-3.1.7.jar</code>, and <code>SellGUI-DynaShop-3.1.7.jar</code>.</li>
            </ul>
          </div>
          <div class="release">
            <div class="release-header"><span class="release-title">3.1.6</span><span class="release-date">2026-07-12</span></div>
            <ul>
              <li>Worth lore now displays a unit price such as <code>$0.45/u</code>, allowing equivalent stacks to merge correctly.</li>
            </ul>
          </div>
          <div class="release">
            <div class="release-header"><span class="release-title">3.1.5</span><span class="release-date">2026-07-12</span></div>
            <ul>
              <li>Stripped packet-only worth lore from incoming inventory clicks to prevent client/server item-component mismatch during stack merges.</li>
            </ul>
          </div>
          <div class="release">
            <div class="release-header"><span class="release-title">3.1.2–3.1.4</span><span class="release-date">2026-06-30 to 2026-07-10</span></div>
            <ul>
              <li>Fixed worth lore refresh after player item drops.</li>
              <li>Fixed packet-injected worth lore interfering with identical item stack merging.</li>
            </ul>
          </div>
          <div class="release">
            <div class="release-header"><span class="release-title">3.1</span><span class="release-date">2026-06-06</span></div>
            <ul>
              <li>Updated plugin, Maven, addon, and documentation version to <code>3.1</code>.</li>
              <li>Added external price provider API for addon plugins.</li>
              <li>Added <code>plugins/SellGUI/addons/</code> addon loading.</li>
              <li>Added <code>SellGUI-DynaShop</code> addon support for ShopGUIPlus-DynaShop dynamic market prices.</li>
              <li>Fixed sound lookup compatibility on Youer/Paper-NeoForge hybrid servers.</li>
            </ul>
          </div>
          <div class="release">
            <div class="release-header"><span class="release-title">3.0.5</span><span class="release-date">2026-05-14</span></div>
            <ul>
              <li>Updated plugin, Maven, and documentation version to <code>3.0.5</code>.</li>
              <li>Worth lore now respects <code>prices.calculation-method</code> instead of drifting into extra Essentials or ShopGUI+ fallback paths.</li>
              <li>Worth lore packet lines now render non-italic.</li>
              <li>Skips synthetic Nexo slot refresh after inventory clicks to better preserve newer Nexo component-based tooltip display.</li>
            </ul>
          </div>
          <div class="release">
            <div class="release-header"><span class="release-title">3.0.4</span><span class="release-date">2026-05-13</span></div>
            <ul>
              <li>Updated plugin, Maven, and documentation version to <code>3.0.4</code>.</li>
              <li>Skips Nexo items during stack normalization.</li>
              <li>Helps preserve Nexo custom metadata during join, quit, smelt-result, and shutdown cleanup.</li>
            </ul>
          </div>
          <div class="release">
            <div class="release-header"><span class="release-title">3.0.3</span><span class="release-date">2026-05-13</span></div>
            <ul>
              <li>Updated plugin, Maven, and documentation version to <code>3.0.3</code>.</li>
              <li>Worth lore packet handling now updates only the packet lore component.</li>
              <li>Fixed Nexo custom attribute displays resetting when worth lore was shown.</li>
            </ul>
          </div>
          <div class="release">
            <div class="release-header"><span class="release-title">3.0.2</span><span class="release-date">2026-05-11</span></div>
            <ul>
              <li>Added <code>item-model</code>, <code>hide-tool-tip</code>, and <code>tooltip-style</code> support for <code>custommenuitems.yml</code>.</li>
              <li>Added example comments for modern item component fields.</li>
              <li>Updated plugin, Maven, and documentation version to <code>3.0.2</code>.</li>
            </ul>
          </div>
          <div class="release">
            <div class="release-header"><span class="release-title">3.0.1</span><span class="release-date">2026-05-10</span></div>
            <ul>
              <li>Added custom menu item menu-filter documentation.</li>
              <li>Added worth-lore whitelist mode and title normalization.</li>
              <li>Fixed duplicate sell-button Total Value lore.</li>
              <li>Preserved evaluated lore and <code>current_price</code> during stacking normalization.</li>
            </ul>
          </div>
          <div class="release">
            <div class="release-header"><span class="release-title">3.0.0</span><span class="release-date">2026-05-09</span></div>
            <ul>
              <li>Added multi-menu sell GUI support.</li>
              <li>Added exclusive item rules for menu-specific categories.</li>
              <li>Split GUI layout into the <code>gui/</code> folder.</li>
              <li>Added stack normalization and bundled ShopGUI API jar for builds.</li>
            </ul>
          </div>
        </div>
      </div>
    `
  }
];

function renderHeader() {
  document.getElementById("siteHeader").innerHTML = `
    <div class="header-inner">
      <a class="brand" href="#home" aria-label="SellGUI wiki home">
        <span class="brand-mark">${icon("gem", 22)}</span>
        <span>
          <h1>SellGUI Wiki</h1>
          <p>v${VERSION} documentation</p>
        </span>
      </a>
      <div class="search-wrap">
        ${icon("search", 18).replace("<i", '<i class="search-icon"')}
        <input id="searchInput" class="search-input" type="search" placeholder="Search commands, config, pricing..." autocomplete="off">
        <span class="search-kbd">/</span>
        <div id="searchResults" class="search-results" role="listbox"></div>
      </div>
      <div class="header-actions">
        <a class="text-button" href="README.md">${icon("file-text", 16)} README</a>
        <a class="text-button" href="CHANGELOG.md">${icon("history", 16)} Changelog</a>
        <button id="themeToggle" class="icon-button" type="button" aria-label="Toggle theme">${icon("moon", 18)}</button>
      </div>
    </div>
  `;
}

function renderSidebar() {
  document.getElementById("sidebar").innerHTML = `
    <div class="sidebar-card">
      <div class="sidebar-title">Documentation</div>
      <nav class="nav-list">
        ${sections.map((section) => `
          <button class="nav-link" type="button" data-section="${section.id}">
            ${icon(section.icon, 18)}
            <span>${escapeHtml(section.title)}</span>
          </button>
        `).join("")}
      </nav>
    </div>
  `;
}

function renderMain() {
  document.getElementById("mainContent").innerHTML = sections.map((section) => `
    <section id="${section.id}" class="section" data-title="${escapeHtml(section.title)}">
      <div class="section-hero">
        <div class="eyebrow">${icon(section.icon, 15)} SellGUI Wiki</div>
        <h2>${escapeHtml(section.title)}</h2>
        <p>${escapeHtml(section.desc)}</p>
      </div>
      ${section.html}
    </section>
  `).join("");
}

function renderFooter() {
  document.getElementById("siteFooter").innerHTML = `
    SellGUI Wiki v${VERSION}. Static documentation generated from the repository docs and configs.
  `;
}

function activateSection(id, pushHash = true) {
  const target = sections.some((section) => section.id === id) ? id : "home";
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.toggle("active", section.id === target);
  });
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.toggle("active", link.dataset.section === target);
  });
  if (pushHash) {
    history.replaceState(null, "", `#${target}`);
  }
  document.getElementById("mainContent").focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setupNavigation() {
  document.querySelectorAll("[data-section]").forEach((button) => {
    button.addEventListener("click", () => activateSection(button.dataset.section));
  });

  window.addEventListener("hashchange", () => {
    activateSection(location.hash.replace("#", ""), false);
  });
}

function setupTheme() {
  const saved = localStorage.getItem("sellgui-wiki-theme");
  if (saved === "light") {
    document.body.classList.add("light");
  }
  const button = document.getElementById("themeToggle");
  button.addEventListener("click", () => {
    document.body.classList.toggle("light");
    localStorage.setItem("sellgui-wiki-theme", document.body.classList.contains("light") ? "light" : "dark");
    button.innerHTML = document.body.classList.contains("light") ? icon("sun", 18) : icon("moon", 18);
    if (window.lucide) lucide.createIcons();
  });
  button.innerHTML = document.body.classList.contains("light") ? icon("sun", 18) : icon("moon", 18);
}

function setupSearch() {
  const input = document.getElementById("searchInput");
  const results = document.getElementById("searchResults");
  const data = sections.map((section) => ({
    id: section.id,
    title: section.title,
    desc: section.desc,
    keywords: `${section.title} ${section.desc} ${section.keywords}`.toLowerCase(),
    icon: section.icon
  }));
  let activeIndex = -1;
  let current = [];

  function render(items) {
    current = items;
    activeIndex = -1;
    if (!items.length) {
      results.classList.remove("open");
      results.innerHTML = "";
      return;
    }
    results.innerHTML = items.map((item, index) => `
      <div class="search-result" data-search-index="${index}" role="option">
        ${icon(item.icon, 18)}
        <div>
          <strong>${escapeHtml(item.title)}</strong>
          <span>${escapeHtml(item.desc)}</span>
        </div>
      </div>
    `).join("");
    results.classList.add("open");
    if (window.lucide) lucide.createIcons();
  }

  function filter(query) {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return data.filter((item) => item.keywords.includes(q)).slice(0, 8);
  }

  input.addEventListener("input", () => render(filter(input.value)));
  input.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      results.classList.remove("open");
      input.blur();
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      activeIndex = Math.min(activeIndex + 1, current.length - 1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      activeIndex = Math.max(activeIndex - 1, 0);
    } else if (event.key === "Enter" && current[activeIndex]) {
      event.preventDefault();
      activateSection(current[activeIndex].id);
      input.value = "";
      results.classList.remove("open");
      return;
    } else {
      return;
    }
    results.querySelectorAll(".search-result").forEach((el, index) => {
      el.classList.toggle("active", index === activeIndex);
    });
  });

  results.addEventListener("click", (event) => {
    const row = event.target.closest("[data-search-index]");
    if (!row) return;
    const item = current[Number(row.dataset.searchIndex)];
    if (!item) return;
    activateSection(item.id);
    input.value = "";
    results.classList.remove("open");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "/" && document.activeElement !== input) {
      event.preventDefault();
      input.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".search-wrap")) {
      results.classList.remove("open");
    }
  });
}

function setupCopyButtons() {
  document.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-copy-target]");
    if (!button) return;
    const target = document.getElementById(button.dataset.copyTarget);
    if (!target) return;
    const text = target.textContent;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
      }
    } catch (error) {
      console.warn("Copy failed", error);
      return;
    }
    const previous = button.innerHTML;
    button.innerHTML = `${icon("check", 14)} Copied`;
    if (window.lucide) lucide.createIcons();
    setTimeout(() => {
      button.innerHTML = previous;
      if (window.lucide) lucide.createIcons();
    }, 1200);
  });
}

function boot() {
  renderHeader();
  renderSidebar();
  renderMain();
  renderFooter();
  setupTheme();
  setupNavigation();
  setupSearch();
  setupCopyButtons();
  activateSection(location.hash.replace("#", "") || "home", false);
  if (window.lucide) lucide.createIcons();
}

document.addEventListener("DOMContentLoaded", boot);
