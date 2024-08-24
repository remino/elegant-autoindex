<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" doctype-public="XSLT-compat" indent="yes"/>
	
	<xsl:param name="currentDir">Current Directory</xsl:param>
	
	<xsl:template match="/">
		<html>
			<head>
				<meta charset="UTF-8" />
				<title><xsl:value-of select="$currentDir" /></title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
				<link rel="stylesheet" type="text/css" href="/elegant-autoindex/style.css"/>
				<script src="/elegant-autoindex/script.js" defer="defer"></script>
			</head>
			<body>
				<header>
					<h1><xsl:value-of select="$currentDir" /></h1>
					<nav>
						<a href="../">Go up to Parent Directory</a>
					</nav>
				</header>
				<table id="files">
					<thead>
						<tr>
							<th class="sortable" data-type="name"><div>Name</div></th>
							<th class="sortable" data-type="type"><div>Type</div></th>
							<th class="sortable" data-type="date"><div>Last Modified</div></th>
							<th class="sortable" data-type="size"><div>Size</div></th>
						</tr>
					</thead>
					<tfoot>
						<tr>
							<th class="sortable" data-type="name"><div>Name</div></th>
							<th class="sortable" data-type="type"><div>Type</div></th>
							<th class="sortable" data-type="date"><div>Last Modified</div></th>
							<th class="sortable" data-type="size"><div>Size</div></th>
						</tr>
					</tfoot>
					<tbody>
						<xsl:for-each select="list/*">
							<tr>
								<td>
									<a href="{.}">
										<xsl:value-of select="." />
									</a>
								</td>
								<td>
									<xsl:choose>
										<xsl:when test="self::file">File</xsl:when>
										<xsl:otherwise>Directory</xsl:otherwise>
									</xsl:choose>
								</td>
								<td>
									<xsl:value-of select="@mtime" />
								</td>
								<td>
									<xsl:if test="self::file">
										<xsl:value-of select="@size" />
									</xsl:if>
								</td>
							</tr>
						</xsl:for-each>
					</tbody>
				</table>
				<footer>
					<a href="https://github.com/remino/elegant-autoindex" target="_blank"><em>elegant-autoindex</em></a> by <a href="https://remino.net/" target="_blank">RÉMINO</a>
				</footer>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
