package de.fhg.iais.roberta.syntax.action.nao;

import java.util.List;

import de.fhg.iais.roberta.blockly.generated.Block;
import de.fhg.iais.roberta.blockly.generated.Field;
import de.fhg.iais.roberta.mode.action.nao.Language;
import de.fhg.iais.roberta.syntax.BlockTypeContainer;
import de.fhg.iais.roberta.syntax.BlocklyBlockProperties;
import de.fhg.iais.roberta.syntax.BlocklyComment;
import de.fhg.iais.roberta.syntax.BlocklyConstants;
import de.fhg.iais.roberta.syntax.Phrase;
import de.fhg.iais.roberta.syntax.action.Action;
import de.fhg.iais.roberta.transformer.Jaxb2AstTransformer;
import de.fhg.iais.roberta.transformer.JaxbTransformerHelper;
import de.fhg.iais.roberta.util.dbc.Assert;
import de.fhg.iais.roberta.visitor.AstVisitor;
import de.fhg.iais.roberta.visitor.NaoAstVisitor;

/**
 * This class represents the <b>naoActions_setLanguage</b> block from Blockly into the AST (abstract syntax tree).
 * Object from this class will generate code for setting the language of the robot.<br/>
 * <br/>
 * The client must provide the {@link Language} (the language NAOs speech engine is set to).
 */
public final class SetLanguage<V> extends Action<V> {

    private final Language language;

    private SetLanguage(Language language, BlocklyBlockProperties properties, BlocklyComment comment) {
        super(BlockTypeContainer.getByName("SET_LANGUAGE"), properties, comment);
        Assert.notNull(language, "Missing language in SetLanguage block!");
        this.language = language;
        setReadOnly();
    }

    @Override
    public String toString() {
        return "SetLanguage [" + this.language + "]";
    }

    /**
     * Creates instance of {@link SetLanguage}. This instance is read only and can not be modified.
     *
     * @param language {@link Language} the speech engine of the robot is set to,
     * @param properties of the block (see {@link BlocklyBlockProperties}),
     * @param comment added from the user,
     * @return read only object of class {@link SetLanguage}
     */
    private static <V> SetLanguage<V> make(Language language, BlocklyBlockProperties properties, BlocklyComment comment) {
        return new SetLanguage<V>(language, properties, comment);
    }

    public Language getLanguage() {
        return this.language;
    }

    @Override
    protected V accept(AstVisitor<V> visitor) {
        return ((NaoAstVisitor<V>) visitor).visitSetLanguage(this);
    }

    /**
     * Transformation from JAXB object to corresponding AST object.
     *
     * @param block for transformation
     * @param helper class for making the transformation
     * @return corresponding AST object
     */
    public static <V> Phrase<V> jaxbToAst(Block block, Jaxb2AstTransformer<V> helper) {
        List<Field> fields = helper.extractFields(block, (short) 1);

        String language = helper.extractField(fields, BlocklyConstants.LANGUAGE);

        return SetLanguage.make(Language.get(language), helper.extractBlockProperties(block), helper.extractComment(block));
    }

    @Override
    public Block astToBlock() {
        Block jaxbDestination = new Block();
        JaxbTransformerHelper.setBasicProperties(this, jaxbDestination);

        JaxbTransformerHelper.addField(jaxbDestination, BlocklyConstants.LANGUAGE, this.language.toString());

        return jaxbDestination;
    }
}
